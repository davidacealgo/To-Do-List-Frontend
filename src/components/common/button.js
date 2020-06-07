import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import "../../style.scss";


export default class ToDoButton extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Hello'
        };
    }

    render() {
        return( 
            <div className="button">
                <Button variant="outlined" color="primary">
                    {this.state.title}
                </Button>
            </div>
        );
    }
}
