import React, { Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import proxy from 'proxy';
import "./style.css";


export default class Weather extends Component {
    constructor() {
        super();
        this.state = {
            task: 'Not yet gotten'
        };
    }
    componentDidMount = () => {
        axios.get("http://localhost:3000/tasks").then(response => {
            console.log(response.data);
        })
    };

    render() {
        return( 
            <div className="button">
                <Button variant="outlined" color="primary">
                    {this.state.task}
                </Button>
            </div>
        );
    }
}
