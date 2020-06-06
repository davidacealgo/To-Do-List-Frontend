import React, { Component} from 'react';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import Task from './task';
import "./style.scss";


export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    componentDidMount = () => {
        axios.get("http://localhost:3000/tasks").then(response => {
            this.setState({
                list : response.data
            })
            console.log(response.data);
        });
    };

    render() {
        return( 
            <div className="listTasks">
                <GridList cellHeight={160} className="gridList" cols={4}>
                {
                    
                    this.state.list.map(task =>
                        <Task
                            title={task.name}
                            description=""
                            state={task.status}
                            created={task.created_at}
                        >
                        </Task>
                    )
                }
                </GridList>
            </div>
        );
    }
}
