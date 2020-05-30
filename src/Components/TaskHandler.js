import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "./TaskHandler.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCheck);
library.add(faPlusCircle);

class TaskHandler extends Component {
  state = {
    newTask: "",
  };

  printList() {
    let task = Object.values(this.props.task);

    return task
      .filter((trueTask) => {
        if (trueTask.status === "Pending") {
          return trueTask;
        } else {
          return 0;
        }
      })
      .map((item, index) => {
        return (
          <div key={index}>
            <div className={classes.list}>
              <p className={classes.listItem}>
                {item.name}
                <span>
                  <FontAwesomeIcon
                    onClick={() => this.props.remove(item.id)}
                    className={classes.faicon}
                    icon="check"
                  />
                </span>
              </p>

              <br />
            </div>
          </div>
        );
      });
  }

  taskCompleted() {
    let task = Object.values(this.props.task);
    return task
      .filter((trueTask) => {
        if (trueTask.status === "Completed") {
          return trueTask;
        } else {
          return 0;
        }
      })
      .map((item, index) => {
        return (
          <div key={index}>
            <div className={classes.list}>
              <p className={classes.listItem}>{item.name}</p>

              <br />
            </div>
          </div>
        );
      });
  }

  handleChange(event) {
    let rawTask = event.target.value;
    this.setState({ newTask: rawTask });
  }

  render() {
    let cond = true;
    if (this.props.task === null) {
      cond = false;
    }
    return (
      <React.Fragment>
        <p className={classes.heading}>Tasks for the day</p>
        {cond === true ? this.printList() : null}
        <div className={classes.addTask}>
          <input
            className={classes.input}
            type="text"
            placeholder="Add task"
            value={this.state.newTask}
            onChange={this.handleChange.bind(this)}
          />
          <FontAwesomeIcon
            className={classes.faicon2}
            onClick={() => this.props.addTask(this.state.newTask)}
            icon="plus-circle"
          />
          <p className={classes.heading}>Tasks Completed</p>
          {cond === true ? this.taskCompleted() : null}
        </div>
      </React.Fragment>
    );
  }
}

export default TaskHandler;