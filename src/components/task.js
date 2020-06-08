import React, { Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
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
            id: this.props.id,
            title: "",
            description: "",
            state: "",
            created: this.props.created,
            user: "",
            users: []
        };
        this.assignUserToTask = this.assignUserToTask.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.getNames = this.getNames.bind(this);

    }

    componentDidMount() {
        axios.get("http://localhost:3000/users").then(response => {
            this.setState({
                users : response.data
            })
        });
    }

    static getDerivedStateFromProps(props, state){
        console.log(props.title);
        return{
            title: props.title,
            description: props.description,
            state: props.state,
            user: props.user
        }
    }

    assignUserToTask(event) {
        let user = this.state.users.filter(user => user.firstName === event.target.value);
        let userId = user[0]._id;
        userId = JSON.parse(`{"user": "${userId}"}`);
        axios.put(`http://localhost:3000/tasks/${this.state.id}/user/`, 
            userId).then(response => {
                //console.log(response.data);
        });
    }

    changeStatus(event) {
        let status = JSON.parse(`{"status": "${event.target.value}"}`);
        axios.put(`http://localhost:3000/tasks/${this.state.id}`, 
            status).then(response => {
                //console.log(response.data);
        });
        console.log(this.state.state);
        this.setState({
            state: event.target.value,
            onChange: !this.state.onChange
        })
        console.log(this.state.state);

    }

    componentDidUpdate(prevState){
        if(this.state.state !== prevState.state){
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
                                  onChange={this.assignUserToTask}
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
                                  onChange={this.changeStatus}
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
    onChange: PropTypes.bool.isRequired
};
