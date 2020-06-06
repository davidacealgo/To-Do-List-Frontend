import React, {Component} from 'react';
import ToDoButton from './components/common/button';
import ListTask from './components/listTask';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ToDoButton>
        </ToDoButton>
        <ListTask></ListTask>
      </div>
    );
  }
}

export default App;
