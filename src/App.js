import React, {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ListTask from './components/listTask';
import Menu from './components/Menu';
import Typography from '@material-ui/core/Typography';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: []
    };
    this.assignUserToTask = this.assignUserToTask.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }      

  retrieveTaskByStatus = (status) => {
    return this.state.tasks.filter((row) => row.status === status);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const validation = (this.state.tasks !== nextState.tasks || this.state.users !== nextState.users)
    return validation
  }

  componentDidMount() {
    axios.get("http://localhost:3000/users").then(response => {
        this.setState({
            users : response.data
        })
    });
    axios.get("http://localhost:3000/tasks").then(response => {
        this.setState({
            tasks : response.data
        })
    });
  }

  assignUserToTask(change, idTask) {
    let user = this.state.users.filter(user => user.firstName === change);
    let userId = user[0]._id;
    const userIdJSON = JSON.parse(`{"user": "${userId}"}`);
    axios.put(`http://localhost:3000/tasks/${idTask}/user/`, 
        userIdJSON).then(response => {
            console.log(response.data);
    });
    this.setState(prevState => {
    const tasks = prevState.tasks.map((row, j) => {
        if(idTask === row._id) {
          return {...row, user: userId};
        } else {
          return row;
        }
      });
      return {tasks}
    });
  }

  changeStatus(task, idTask) {
    let status = JSON.parse(`{"status": "${task}"}`);
    axios.put(`http://localhost:3000/tasks/${idTask}`, 
        status).then(response => {
            console.log(response.data);
    });
    this.setState(prevState => {
    const tasks = prevState.tasks.map((row, j) => {
        if(idTask === row._id) {
          return {...row, status: task};
        } else {
          return row;
        }
      });
      return {tasks}
    });
  }

  createTask(){
    console.log("create task");
  }

  render() {
    return (
      <div className="App">
        <Menu
          createTaskHandler={this.createTask}
        ></Menu>
        <Grid container spacing={1} className="gridList">
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Open
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Open')}
              users={this.state.users}
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}>Open</ListTask>
          </Grid>
          <Grid item xs={3}>
          <Typography variant="h5" className="listTaskTitle">
                In progress
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('In progress')} 
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}>In progress</ListTask>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Closed
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Closed')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}>Closed</ListTask>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Archived
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Archived')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}>Archived</ListTask>
          </Grid>
        </Grid>
      </div>
    );
  }
}
