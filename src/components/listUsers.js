import React, { Component} from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import "../style.scss";


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    componentDidMount = () => {
        axios.get("http://localhost:3000/users").then(response => {
            this.setState({
                list : response.data
            })
        });
    };

    render() {
        return( 
            <List className="listUsers">
                {this.state.list.map((user) => {
                    return (
                    <ListItem key={user._id}>
                        <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                    </ListItem>
                    );
                })}
            </List>
        );
    }
}
