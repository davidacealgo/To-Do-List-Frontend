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
            users: props.users // Aca tenes que mandar los user por medio de los props 
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.tasks !== this.props.tasks) {
            this.setState({tasks: nextProps.tasks});
        }
        if(nextProps.users !== this.props.users) {
            this.setState({users: nextProps.users});
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
                            status={task.status}
                            user={task.user}
                            users={this.state.users}
                        ></Task>
                    ))}
            </div>
        );
    }
}