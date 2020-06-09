import React, { Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import "../style.scss";


export default class UserPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createUserHandler: props.createUserHandler,
            value: ''
        };
    }

	handleChange = (event) => {
		this.setState({value: event.target.value});
	};

    render() {
        return(
            <TextField
	          id="standard-multiline-flexible"
	          label="Multiline"
	          multiline
	          rowsMax={4}
	          value={value}
	          onChange={handleChange}
	        />
        );
    }
}

