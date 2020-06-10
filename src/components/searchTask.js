import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import "../style.scss";


export default class SearchTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
      		  successTask: props.openTask,
            taskFound: props.taskFound,
        };

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.taskFound !== this.props.taskFound)
            this.setState({taskFound: this.props.taskFound})
        if(prevProps.successTask !== this.props.successTask)
            this.setState({successTask: this.props.successTask})
        debugger;
    }

    onKeyDown(event){
    	if(event.keyCode === 13){
        	this.props.onHandleSearch(event.target.value);
      	}
    }

    handleCloseTask = () => {
      this.setState({successTask: false, taskFound: []});
  	};

    render() {
    	return(
            <div className="search">
	            <div className="searchIcon">
	              <SearchIcon />
	            </div>
	            <InputBase
	            	id="search-task"
	            	name="searchTask"
	                placeholder="Search task title…"
	                inputProps={{ 'aria-label': 'search task', 'error': "true" }}
	                onChange={this.handleSearchTask}
	                onKeyDown={this.onKeyDown}
	            />
	            <Dialog open={this.state.successTask} onClose={this.handleCloseTask} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">View task</DialogTitle>
            <DialogContent>
              <div className="textField">
                <TextField
                  autoFocus
                  disabled="true"
                  label="Title"
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
                  disabled="true"
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
              <div className="searchStatus">
                  <FormControl className="formSearch" disabled>
                      <InputLabel id="assign-user-input">Status</InputLabel>
                      <Select
                          noderef = {this.selectRef}
                          value = {this.state.taskFound.status}
                          labelId="change-status"
                          id="change-status-select"
                      > 
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="In progress">In progress</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Archived">Archived</MenuItem>
                      </Select>
                  </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseTask} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        );
        
    }
}

SearchTask.propTypes = {
	onHandleSearch: PropTypes.func.isRequired,
	successTask: PropTypes.bool.isRequired,
	taskFound: PropTypes.object.isRequired
}

