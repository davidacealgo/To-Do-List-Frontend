import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import "../style.scss";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edittTitle: '',
            editDescription: '',
            errorTitle: false,
            errorDescription: false,
            id: props.id,
            title: props.title,
            description: props.description,
            status: props.status,
            created: props.created,
            onChangeState: props.onChangeState,
            onChangeUser: props.onChangeUser,
            onDeleteUserTask: props.onDeleteUserTask,
            onEditTask: props.onEditTask,
            user: props.user,
            users: props.users,
            successEdit: false
        };
        this.getNames = this.getNames.bind(this);
    }

    componentDidMount(){
        this.setState({editDescription: this.state.description, edittTitle: this.state.title})
    }

    componentDidUpdate(prevProps){
        if(prevProps.title !== this.props.title)
            this.setState({title: this.props.title})
        if(prevProps.description !== this.props.description)
            this.setState({description: this.props.description})
        if(prevProps.status !== this.props.status)
            this.setState({status: this.props.status})
        if(prevProps.user !== this.props.user)
            this.setState({user: this.props.user})
        if(prevProps.users !== this.props.users)
            this.setState({users: this.props.users})
    }

    handleUser = event => {
        const user = event.target.value;
        this.props.onChangeUser(user, this.state.id);
    }

    handleState = event => {
        const task = event.target.value;
        this.props.onChangeState(task, this.state.id);
    }

    getNames(id) {
        if(typeof id === 'undefined' || !this.state.users){
            return 'Not assigned'
        } else {
            const user = this.state.users.filter(user => user._id === id);
            if (typeof(user[0]) !== 'undefined')
                return(`${user[0].firstName} ${user[0].lastName}` );
        }    
    }

    deleteUserTaskHandle = event => {
        this.props.onDeleteUserTask(this.state.id);
    }

    editTaskHandle = event => {
        this.setState({successEdit: true})
    }

    handleCloseEdit = () => {
        this.setState({successEdit: false});
    };

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    sendEditTask = event => {    
        console.log("error desc "+this.state.errorDescription );
        console.log("error title "+this.state.errorTitle)
        if(this.state.editDescription===''){
            this.setState({errorDescription: true})
        } else {
            this.setState({errorDescription: false})
        }
        if(this.state.edittTitle===''){
            this.setState({errorTitle: true})
        } else {
            this.setState({errorTitle: false})
        }
        if(this.state.edittTitle === '' && this.state.editDescription === ''){
            this.setState({errorDescription: true, errorTitle: true})
        }
        else if(this.state.editDescription!=='' && this.state.edittTitle!==''){
            this.props.onEditTask(this.state.id, this.state.editDescription, this.state.edittTitle, this.state.status);
            this.setState({successEdit: false});
        }

    }

    render() {
        return(
            <div>
                <Card className="task">
                    <Tooltip title="Delete user of task">
                        <IconButton color="secondary" aria-label="delete-task" component="span" onClick={this.deleteUserTaskHandle} variant="outlined">
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit task">
                        <IconButton color="primary" aria-label="edit-task" component="span" onClick={this.editTaskHandle}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <CardContent>
                        <Typography className="title" variant="h5">
                            {this.state.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.created.substring(0,10)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            User: {this.getNames(this.state.user)}
                        </Typography>
                    </CardContent>
                    <CardActions className="actions">
                        <div className="assignUser">
                            <FormControl className="FormControl">
                                <InputLabel id="assign-user-input">User</InputLabel>
                                <Select
                                    value=""
                                    labelId="assign-user"
                                    id="assign-user-select"
                                    onChange={this.handleUser}
                                    noderef = {this.selectRef}
                                >
                                {
                                    this.state.users.map((user) =>{
                                        return (
                                            <MenuItem key={user._id} value={user.firstName}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                                        );
                                    })
                                }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="changeStatus">
                            <FormControl className="formControl">
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
                    </CardActions>
                </Card>
                <Dialog className="dialog" open={this.state.successEdit} onClose={this.handleCloseEdit} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
                  <DialogContent>
                      <div className="textField">
                          <TextField
                            autoFocus
                            error={this.state.errorTitle}
                            helperText={this.state.edittTitle === "" ? 'Empty field!' : ' '}
                            label="Title"
                            margin="dense"
                            name="edittTitle"
                            placeholder="Title"
                            id="edit-task-title"
                            onChange={this.handleInput}
                            type="text"
                            value={this.state.edittTitle}
                            fullWidth
                          />
                      </div>
                      <div>
                          <TextField
                            error={this.state.errorDescription}
                            helperText={this.state.editDescription === "" ? 'Empty field!' : ' '}
                            margin="dense"
                            multiline
                            name="editDescription"
                            variant="outlined"
                            rows={3}
                            label="Description"
                            onChange={this.handleInput}
                            id="edit-task-description"
                            type="text"
                            value={this.state.editDescription}
                          />
                      </div>
                  </DialogContent>
                  <DialogActions className="dialogActions">
                    <Button onClick={this.handleCloseEdit} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={this.sendEditTask} color="primary">
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Task.defaultProps = {
    title: 'Title of the task',
    description: ''
};

Task.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    user: PropTypes.string,
    users: PropTypes.array,
    onChangeState: PropTypes.func,
    onChangeUser: PropTypes.func,
    onDeleteUserTask: PropTypes.func,
    onEditTask: PropTypes.func
};

