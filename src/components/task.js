import React, { Component} from 'react';
import axios from 'axios';
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
            title: "",
            description: "",
            state: "",
            created: props.created,
            onChangeState: props.onChangeState,
            onChangeUser: props.onChangeUser,
            user: "",
            users: []
        };
        this.getNames = this.getNames.bind(this);

    }

    componentDidMount() {
        axios.get("http://localhost:3000/users").then(response => {
            this.setState({
                users : response.data
            })
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.title !== this.props.title)
            this.setState({title: nextProps.title})
        if(nextProps.description !== this.props.description)
            this.setState({description: nextProps.description})
        if(nextProps.state !== this.props.state)
            this.setState({state: nextProps.state})
        console.log(this.props.state);
        if(nextProps.user !== this.props.user)
            this.setState({user: nextProps.user})
    }

    handleChangeUser = event => {
        const user = event.target.value;
        this.props.onChangeUser(user, this.state.id);
    }

    handleState = event => {
        const task = event.target.value;
        this.props.onChangeState(task, this.state.id);
    }

    componentDidUpdate(prevState){
        if(this.state.user !== prevState.user){
            console.log('cambió');
        }
    }

    getNames(id) {
        if(typeof id === 'undefined' || !this.state.users){
            return 'No asignado'
        } else {
            const user = this.state.users.filter(user => user._id === id);
            if (typeof(user[0]) !== 'undefined')
                return(`${user[0].firstName} ${user[0].lastName}` );
        }
        //console.log(user[0].firstName);
        //return(`${user[0].firstName} ${user[0].lastName}`)
        /*user.map((u) =>{
            console.log(u.firstName);
            return(`"${u.firstName}" "${u.lastName}"`)
        });*/    
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
                            User: {this.getNames(this.props.user)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div className="assignUser">
                            <FormControl>
                                <InputLabel id="assign-user-input">Assign user</InputLabel>
                                <Select
                                  labelId="assign-user"
                                  id="assign-user-select"
                                  onChange={this.handleChangeUser}
                                >
                                {
                                    this.state.users.map((user) =>{
                                        return (
                                            <MenuItem value={user.firstName}>{user.firstName}</MenuItem>
                                        );
                                    })
                                }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="changeStatus">
                            <FormControl>
                                <InputLabel id="assign-user-input">Change status</InputLabel>
                                <Select
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
    user: PropTypes.string.isRequired,
    onChangeState: PropTypes.func,
    onChangeUser: PropTypes.func
};
