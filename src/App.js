import React, { Component } from 'react';

import classes from './App.css';
import TaskController from './Container/TaskController';


class App extends Component {
  render() {
    return (
      <div className={classes.Appp}>
        <TaskController />
       
      </div>
    );
  }
}

export default App;
