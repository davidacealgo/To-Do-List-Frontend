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
        	inputDescription: '',
      		successTask: props.openTask,
            searchTask: '',
            taskFound: props.taskFound,
            onHandleSearch: props.onHandleSearch
        };

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount(){
		this.setState({description: this.state.taskFound.description})
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.taskFound !== this.props.taskFound)
            this.setState({taskFound: this.props.taskFound})
        if(prevProps.successTask !== this.props.successTask)
            this.setState({successTask: this.props.successTask})
        if(this.state.successTask !== prevState.successTask)
        	this.setState({successTask: this.state.successTask})
    }

    getDescription(){
    	return(`${this.state.taskFound.description}`)
    }

	handleInput = (event) => {
		
    	const task = Object.keys(this.state.taskFound)
    		.map.set('description', event.target.value)
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
	                placeholder="Search task…"
	                inputProps={{ 'aria-label': 'search task' }}
	                onChange={this.handleSearchTask}
	                onKeyDown={this.onKeyDown}
	            />
	            <Dialog open={this.state.successTask} onClose={this.handleCloseTask} aria-labelledby="form-dialog-title">
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
                  value={this.getDescription}
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
                  onChange={this.handleInput}
                  type="text"
                  value={this.state.description}
                />
              </div>
              <div className="changeStatus">
                  <FormControl className="FormControl">
                      <InputLabel id="assign-user-input">Status</InputLabel>
                      <Select
                          noderef = {this.selectRef}
                          value = {this.state.status}
                          labelId="change-status"
                          id="change-status-select"
                          onChange={this.handleState}
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

SearchTask.propTypes = {
	onHandleSearch: PropTypes.func,
	successTask: PropTypes.bool,
	taskFound: PropTypes.object
}
