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
            list: [],
            taskState: this.props.taskState
        };
    }
    componentDidMount = () => {
        axios.get("http://localhost:3000/tasks").then(response => {
            this.setState({
                list : response.data
            })
        });
    };

    render() {
        return( 
            <div className="listTasks">
                <Typography variant="h6">
                    {this.state.taskState}
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
                                user={task.user}
                            ></Task>
                    ))}
            </div>
        );
    }
}

TaskList.propTypes = {
    taskState: PropTypes.string.isRequired
};
