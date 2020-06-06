import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import "./style.scss";


export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            state: this.props.state,
            created: this.props.created
        };
    }

    render() {
        debugger;
        return( 
            <div className="task">
                <Card className="task">
                    <CardContent>
                        <Typography className="title" color="textSecondary" gutterBottom>
                        {this.state.title}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {this.state.description}
                        </Typography>
                        <Typography className="pos" color="textSecondary">
                        {this.state.created}
                        </Typography>
                        <Typography variant="body2" component="p">
                        {this.state.state}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Change status</Button>
                        <Button size="small">Assign user</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Task.defaultProps = {
    title: 'Title of the task',
    description: '',
    state: 'Open',
    created: new Date()
};

Task.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    created: PropTypes.instanceOf(Date)
};
