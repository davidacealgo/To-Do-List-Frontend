import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListTask from './components/listTask';
import PropTypes from 'prop-types';
import UserList from './components/listUsers';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    }
  }      

  componentDidUpdate(prevState){
      debugger;
      if(this.state.change !== prevState.change){
          console.log('cambió');
      }
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={1} className="gridList">
          <Grid item xs={3}>
            <ListTask taskState='Open' listChange={this.state.change}></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='In progress' listChange={this.state.change}></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='Closed' listChange={this.state.change}></ListTask>
          </Grid>
          <Grid item xs={3}>
            <ListTask taskState='Archived' listChange={this.state.change}></ListTask>
          </Grid>
          <Grid item xs={1}>
            <UserList></UserList>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  change: PropTypes.bool
};
