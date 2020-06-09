import React, { Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import "../style.scss";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            status: props.status,
            created: props.created,
            onChangeState: props.onChangeState,
            onChangeUser: props.onChangeUser,
            user: props.user,
            users: props.users // Esto se recibe desde el props -> El get request lo tenes que hacer en el App.js
        };
        this.getNames = this.getNames.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.title !== this.props.title)
            this.setState({title: this.props.title})
        if(prevProps.description !== this.props.description)
            this.setState({description: this.props.description})
        if(prevProps.status !== this.props.status)
            this.setState({status: this.props.status})
        if(prevProps.user !== this.props.user)
            this.setState({user: this.props.user})
        if(prevProps.users !== this.props.users)
            this.setState({users: this.props.users})
    }

    handleUser = event => {
        const user = event.target.value;
        this.props.onChangeUser(user, this.state.id);
    }

    handleState = event => {
        const task = event.target.value;
        this.props.onChangeState(task, this.state.id);
    }

    getNames(id) {
        if(typeof id === 'undefined' || !this.state.users){
            return 'Not assigned'
        } else {
            const user = this.state.users.filter(user => user._id === id);
            if (typeof(user[0]) !== 'undefined')
                return(`${user[0].firstName} ${user[0].lastName}` );
        }    
    }

    render() {
        return(
            <div className="task">
                <Card className="task">
                    <CardContent>
                        <Typography className="title" variant="h5">
                            {this.state.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.created.substring(0,10)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            User: {this.getNames(this.state.user)}
                        </Typography>
                    </CardContent>
                    <CardActions className="actions">
                        <div className="assignUser">
                            <FormControl className="FormControl">
                                <InputLabel id="assign-user-input">User</InputLabel>
                                <Select
                                    value=""
                                    labelId="assign-user"
                                    id="assign-user-select"
                                    onChange={this.handleUser}
                                    noderef = {this.selectRef}
                                >
                                {
                                    this.state.users.map((user) =>{
                                        return (
                                            <MenuItem key={user._id} value={user.firstName}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                                        );
                                    })
                                }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="changeStatus">
                            <FormControl className="FormControl">
                                <InputLabel id="assign-user-input">Status</InputLabel>
                                <Select
                                    noderef = {this.selectRef}
                                    value = {this.state.status}
                                    labelId="change-status"
                                    id="change-status-select"
                                    onChange={this.handleState}
                                > 
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="In progress">In progress</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                                <MenuItem value="Archived">Archived</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Task.defaultProps = {
    title: 'Title of the task',
    description: ''
};

Task.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    user: PropTypes.string,
    users: PropTypes.array,
    onChangeState: PropTypes.func,
    onChangeUser: PropTypes.func
};