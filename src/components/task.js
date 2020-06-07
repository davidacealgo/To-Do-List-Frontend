import React, { Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
            title: this.props.title,
            description: this.props.description,
            state: this.props.state,
            created: this.props.created,
            user: this.props.user,
            users : []
        };
        this.assignUserToTask = this.assignUserToTask.bind(this);
        this.getNames = this.getNames.bind(this);

    }

    componentDidMount() {
        axios.get("http://localhost:3000/users").then(response => {
            this.setState({
                users : response.data
            })
        });
    }

    assignUserToTask(event, id) {
        if(typeof id === 'undefined'){
            console.log('jiji');
            return 0;
        }
        let user = this.state.users.filter(user => user.firstName === event.target.value);
        let userId = user[0]._id;
        console.log(userId);
        userId = JSON.parse(`{"user": "${userId}"}`);
        console.log(userId)
        console.log(this.state.id);
        axios.put(`http://localhost:3000/tasks/5ed88ab3bb7c110f13722a35/user/`, 
            userId).then(response => {
                console.log(response.data);
        });
    }

    getNames(id) {
        debugger;
        if(typeof id === 'undefined' || !this.state.users){
            return 'No asignado'
        } else {
            const user = this.state.users.filter(user => user._id === id);
            if (typeof(user[0]) !== 'undefined')
                return(`${user[0].firstName} ${user[0].lastName}` );
        }
        debugger;
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
                            User: {this.getNames(this.state.user)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <InputLabel id="assign-user">Assign User</InputLabel>
                        <Select
                          labelId="assign-user"
                          id="assign-user-select"
                          onChange={this.assignUserToTask}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            this.state.users.map((user) =>{
                                return (
                                    <MenuItem value={user.firstName}>{user.firstName}</MenuItem>
                                );
                            })
                        }
                        </Select>
                        <Button size="small">Assign user</Button>
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
    users: PropTypes.array
};
