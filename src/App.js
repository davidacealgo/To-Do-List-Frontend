import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListTask from './components/listTask';
import UserList from './components/listUsers';
import './style.scss';

export default class App extends Component {
            
  render() {
    return (
      <div className="App">
        <Grid container spacing={1} className="gridList">
          <Grid item xs={3}>
            <ListTask taskState='Open'></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='In progress'></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='Closed'></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='Archived'></ListTask>
          </Grid>
          <Grid item xs={1}>
            <UserList></UserList>
          </Grid>
        </Grid>
      </div>
    );
  }
}