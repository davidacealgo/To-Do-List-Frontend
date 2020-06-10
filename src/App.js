import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import ListTask from './components/listTask';
import Menu from './components/Menu';
import SearchTask from './components/searchTask';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTask: false,
      tasks: [],
      users: [],
      taskFound: []
    };
    this.assignUserToTask = this.assignUserToTask.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.createTask = this.createTask.bind(this);
    this.createUser = this.createUser.bind(this);
    this.deleteUserTask = this.deleteUserTask.bind(this);
    this.searchTask = this.searchTask.bind(this);
  }      

  retrieveTaskByStatus = (status) => {
    return this.state.tasks.filter((row) => row.status === status);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.openTask !== nextState.openTask);
    const validation = (this.state.tasks !== nextState.tasks || 
      this.state.users !== nextState.users ||
      this.state.openTask !== nextState.openTask)
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
    const status = JSON.parse(`{"status": "${task}"}`);
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

  handleCloseTask = () => {
      this.setState({openTask: false});
  };
  searchTask(task){
    const taskFound = this.state.tasks.filter((row) => row.title === task);
    if(Object.keys(taskFound).length !== 0)
    {
      axios.get(`http://localhost:3000/tasks/${taskFound[0]._id}`)
          .then(response => {
            console.log(response.data);
            this.setState({ taskFound: response.data, openTask: true });
          });
    } else {
      //this.setState({taskFound})
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
        >{this.state.taskFound}</Menu>
        <Grid container spacing={1} className="gridList">
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Open
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Open')}
              users={this.state.users}
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}>Open</ListTask>
          </Grid>
          <Grid item xs={3}>
          <Typography variant="h5" className="listTaskTitle">
                In progress
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('In progress')} 
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}>In progress</ListTask>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Closed
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Closed')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}>Closed</ListTask>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" className="listTaskTitle">
                Archived
            </Typography>
            <ListTask 
              tasks={this.retrieveTaskByStatus('Archived')}  
              users={this.state.users} 
              changeStatusHandler={this.changeStatus}
              changeUserHandler={this.assignUserToTask}
              deleteUserTaskHandler={this.deleteUserTask}>Archived</ListTask>
          </Grid>
        </Grid>
        <Dialog open={this.state.openTask} onClose={this.handleCloseTask} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
            <DialogContent>
              <div className="textField">
                <TextField
                  autoFocus
                  margin="dense"
                  name="inputTitle"
                  placeholder="Title"
                  id="task-title"
                  type="text"
                  fullWidth
                  value={this.state.taskFound.title}
                />
              </div>
              <div>
                <TextField
                  margin="dense"
                  multiline
                  name="inputDescription"
                  variant="outlined"
                  rows={3}
                  label="Description"
                  id="task-description"
                  type="text"
                  value={this.state.taskFound.description}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseTask} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleEditTask} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

