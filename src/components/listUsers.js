import React, { Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import "../style.scss";


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            createUserHandler: props.createUserHandler
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleCreateUser = () => {

    }
    render() {
        return(
            <div className="list">
            </div>
        );
    }
}

