import React, {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ListTask from './components/listTask';
import Menu from './components/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTask: false,
      tasks: [],
      users: [],
      searchError: false,
      taskFound: {}
    };
    this.assignUserToTask = this.assignUserToTask.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.createTask = this.createTask.bind(this);
    this.createUser = this.createUser.bind(this);
    this.deleteUserTask = this.deleteUserTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.searchTask = this.searchTask.bind(this);
  }      

  Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  retrieveTaskByStatus = (status) => {
    return this.state.tasks.filter((row) => row.status === status);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const validation = (this.state.tasks !== nextState.tasks || 
      this.state.users !== nextState.users ||
      this.state.openTask !== nextState.openTask ||
      this.state.searchError !== nextState.searchError) 
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

  changeStatus(newStatus, idTask) {
    const status = JSON.parse(`{"status": "${newStatus}"}`);
    axios.put(`http://localhost:3000/tasks/${idTask}`, 
        status).then(response => {
            console.log(response.data);
    });
    this.setState(prevState => {
    const tasks = prevState.tasks.map((row, j) => {
        if(idTask === row._id) {
          return {...row, status: newStatus};
        } else {
          return row;
        }
      });
      return {tasks}
    });
  }

  createTask(title, description){
    const body = JSON.parse(`{"title": "${title}", "description": "${description}"}`);
    axios.post('http://localhost:3000/tasks/',
      body).then(response => {
        this.setState({
          tasks: [...this.state.tasks, response.data]
        })
      });
  }

  createUser(firstName, lastName){
    const body = JSON.parse(`{"firstName": "${firstName}", "lastName": "${lastName}"}`);
    axios.post('http://localhost:3000/users/',
      body).then(response => {
        this.setState({
          users: [...this.state.users, response.data]
        })
      });
  }

  deleteUserTask(idTask){
    axios.delete(`http://localhost:3000/tasks/${idTask}/user/`)
      .then(response => {
            console.log(response.data);
    });
    this.setState(prevState => {
    const tasks = prevState.tasks.map((row, j) => {
        if(idTask === row._id) {
          return {...row, user: ""};
        } else {
          return row;
        }
      });
      return {tasks}
    });
  }

  editTask(idTask, description, title, status){
    const task = JSON.parse(`{"description": "${description}", "title": "${title}", "status": "${status}"}`);
    axios.put(`http://localhost:3000/tasks/${idTask}`, 
        task).then(response => {
            console.log(response.data);
    });
    this.setState(prevState => {
    const tasks = prevState.tasks.map((row, j) => {
        if(idTask === row._id) {
          return {...row, title: title, description: description, status: status};
        } else {
          return row;
        }
      });
      return {tasks}
    });
  }

  handleCloseAlert = () => {
      this.setState({searchError: false})
  }

  searchTask(task){
    this.setState({openTask: false})
    const taskFound = this.state.tasks.filter((row) => row.title.toLowerCase() === task.toLowerCase());
    if(Object.keys(taskFound).length !== 0)
    {
      axios.get(`http://localhost:3000/tasks/${taskFound[0]._id}`)
          .then(response => {
            this.setState({ taskFound: response.data, openTask: true, searchError: false });
          });
    } else {
      this.setState({searchError: true})
    }
  }

  render() {
    return (

      <div className="App">
        <Menu
          onCreateTask={this.createTask}
          onCreateUser={this.createUser}
          onSearchTask={this.searchTask}
          taskFound={this.state.taskFound}
          openTask={this.state.openTask}
        >{this.state.taskFound}</Menu>
        <Grid container spacing={1} className="gridList">
          <Grid item xs={3} className="openList">
            <Typography variant="h5" className="listTaskTitle">
                Open
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Open')}
              users={this.state.users}
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}
              editTask={this.editTask}>Open</ListTask>
          </Grid>
          <Grid item xs={3} className="inProgressList">
          <Typography variant="h5" className="listTaskTitle">
                In progress
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('In progress')} 
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}
              editTask={this.editTask}>In progress</ListTask>
          </Grid>
          <Grid item xs={3} className="closeList">
            <Typography variant="h5" className="listTaskTitle">
                Closed
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Closed')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}
              editTask={this.editTask}>Closed</ListTask>
          </Grid>
          <Grid item xs={3} className="archivedList">
            <Typography variant="h5" className="listTaskTitle">
                Archived
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Archived')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}
              editTask={this.editTask}>Archived</ListTask>
          </Grid>
        </Grid>
        <Snackbar open={this.state.searchError} autoHideDuration={3000} onClose={this.handleCloseAlert}>
            <this.Alert name="success" id="success" onClose={this.handleCloseAlert} severity="error">
              {`Task title not found!`}
            </this.Alert>
        </Snackbar>
      </div>
    );
  }
}


