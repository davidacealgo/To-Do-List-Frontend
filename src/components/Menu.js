
import React, { Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import UserList from './listUsers';
import "../style.scss";


export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openUser: false,
            openTask: false,
            onCreateTask: props.onCreateTask,
            inputTitle: '',
            inputDescription: ''
        };
    }

    handleClickUser = (event) => {
    	this.setState({openUser: true});
    };

    handleClickTask = (event) => {
    	this.setState({openTask: true});
    };

    handleCloseUser = () => {
        this.setState({openUser: false});
    };

    handleCloseTask = () => {
        this.setState({openTask: false});
    };

    handleInputTask = (event) => {
    	this.setState({[event.target.name]: event.target.value})
    }

    handleCreateTask(){
    	console.log("hola");
    }

    handleCreateUser(){
    	console.log("hola"+`${this.state.inputTitle}`);
    }

    render() {
        return(  
        	<div className="list">
        		<div>
	                <Button variant="outlined" color="primary" onClick={this.handleClickUser}>
			        	Create User
			      	</Button>
			      	<Dialog open={this.state.openUser} onClose={this.handleCloseUser} aria-labelledby="form-dialog-title">
				        <DialogTitle id="form-dialog-title">Create user</DialogTitle>
				        <DialogContent>
				          <div className="textField">
					          <TextField
					            autoFocus
					            margin="dense"
					            placeholder="First Name"
					            id="user-first-name"
					            type="text"
					            fullWidth
					          />
				          </div>
				          <div>
					          <TextField
					            margin="dense"
					            placeholder="Last Name"
					            id="user-last-name"
					            type="text"
					          />
				          </div>
				        </DialogContent>
				        <DialogActions>
				          <Button onClick={this.handleCloseUser} color="primary">
				            Cancel
				          </Button>
				          <Button onClick={this.handleCloseUser} color="primary">
				            Send
				          </Button>
				        </DialogActions>
			      	</Dialog>
		      	</div>
		      	<div>
			      	<Button variant="outlined" color="primary" onClick={this.handleClickTask}>
			        	Create task
			      	</Button>
			      	<Dialog open={this.state.openTask} onClose={this.handleCloseTask} aria-labelledby="form-dialog-title">
				        <DialogTitle id="form-dialog-title">Create task</DialogTitle>
				        <DialogContent>
				          <div className="textField">
					          <TextField
					            autoFocus
					            margin="dense"
					            name="inputTitle"
					            placeholder="Title"
					            id="task-title"
					            onChange={this.handleInputTask}
					            type="text"
					            fullWidth
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
					            onChange={this.handleInputTask}
					            id="task-description"
					            type="text"
					          />
				          </div>
				        </DialogContent>
				        <DialogActions>
				          <Button onClick={this.handleCloseTask} color="primary">
				            Cancel
				          </Button>
				          <Button onClick={this.handleCreateTask} color="primary">
				            Send
				          </Button>
				        </DialogActions>
			      	</Dialog>
		      	</div>
            </div>
        );
    }
}

TopBar.propTypes = {
    onCreateTask: PropTypes.func
};
