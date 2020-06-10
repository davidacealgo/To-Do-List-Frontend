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
            editTask: props.editTask,
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

    onKeyDown(event){
    	if(event.keyCode === 13){
        	this.props.onHandleSearch(event.target.value);
      	}
    }

    handleCloseEdit = () => {
      this.setState({openEdit: false, editTask: []});
  	};

    render() {
    	return(
            <div className="search">
  	          <Dialog open={this.state.openEdit} onClose={this.handleCloseEdit} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
                  <DialogContent>
                    <div className="textField">
                        <TextField
                          autoFocus
                          label="First name"
                          margin="dense"
                          name="inputFirstName"
                          onChange={this.handleInput}
                          placeholder="First Name"
                          id="user-first-name"
                          type="text"
                          fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                          label="Last name"
                          name="inputLastName"
                          margin="dense"
                          onChange={this.handleInput}
                          placeholder="Last Name"
                          id="user-last-name"
                          type="text"
                        />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseUser} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleCreateUser} color="primary">
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

