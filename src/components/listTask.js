import "../style.scss";
import React, { Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Task from './task';
import Typography from '@material-ui/core/Typography';


export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTask: '',
            list: [],
            task: '',
            taskState: props.taskState,
            users: [],
            listChange: props.listChange
        };
        this.assignUserToTask = this.assignUserToTask.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.listChange !== this.props.listChange);
        if(nextProps.listChange !== this.props.listChange)
          this.setState({listChange: !this.props.listChange});
    }   

    componentDidMount = () => {
        axios.get("http://localhost:3000/tasks").then(response => {
            this.setState({
                list : response.data
            })
        });
        axios.get("http://localhost:3000/users").then(response => {
            this.setState({
                users : response.data
            })
        });
    };

    assignUserToTask(change, idTask) {
        let user = this.state.users.filter(user => user.firstName === change);
        let userId = user[0]._id;
        userId = JSON.parse(`{"user": "${userId}"}`);
        axios.put(`http://localhost:3000/tasks/${idTask}/user/`, 
            userId).then(response => {
                console.log(response.data);
        });
        this.setState({idTask: idTask, listChange: !this.state.listChange})
    }

    changeStatus(task, idTask) {
        let status = JSON.parse(`{"status": "${task}"}`);
        axios.put(`http://localhost:3000/tasks/${idTask}`, 
            status).then(response => {
                console.log(response.data);
        });
        this.setState({task: task, listChange: !this.state.listChange})
    } 

    render() {
        return( 
            <div className="listTasks">
                <Typography variant="h6">
                    {this.props.listChange}
                </Typography>
                {this.state.list
                    .filter(task => task.status === this.state.taskState)
                    .map((task, id) => (
                        <Task
                            key={id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            created={task.created_at}
                            onChangeState={this.changeStatus}
                            onChangeUser={this.assignUserToTask}
                            state={task.status}
                            user={task.user}
                        ></Task>
                    ))}
            </div>
        );
    }
}

TaskList.propTypes = {
    taskState: PropTypes.string.isRequired,
    listChange: PropTypes.bool
};
