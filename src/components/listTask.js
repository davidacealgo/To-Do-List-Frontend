import "../style.scss";
import React, { Component} from 'react';
import Task from './task';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
            changeStatusHandler: props.changeStatusHandler,
            changeUserHandler: props.changeUserHandler,
            deleteUserTaskHandler: props.deleteUserTaskHandler,
            editTask: props.editTask,
            users: props.users // Aca tenes que mandar los user por medio de los props 
        };
    }

    componentDidUpdate(prevProps){
        if(prevProps.tasks !== this.props.tasks) {
            this.setState({tasks: this.props.tasks});
        }
        if(prevProps.users !== this.props.users) {
            this.setState({users: this.props.users});
        }
    }   

    render() {
        return( 
            <div className="listTasks">
                {this.state.tasks
                    .map((task) => (
                        <Task
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            created={task.created_at}
                            onChangeState={this.state.changeStatusHandler}
                            onChangeUser={this.state.changeUserHandler}
                            onDeleteUserTask={this.state.deleteUserTaskHandler}
                            onEditTask={this.state.editTask}
                            status={task.status}
                            user={task.user}
                            users={this.state.users}
                        ></Task>
                    ))}
            </div>
        );
    }
}

