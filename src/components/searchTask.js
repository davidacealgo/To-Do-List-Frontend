import React, { Component} from 'react';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import "../style.scss";


export default class SearchTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTask: '',
            taskFound: props.taskFound,
            onHandleSearch: props.onHandleSearch
        };

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.taskFound !== this.props.taskFound)
            this.setState({taskFound: this.props.taskFound})
    }

	handleInput = (event) => {
    	this.setState({[event.target.name]: event.target.value})
    }

    onKeyDown(event){
    	if(event.keyCode === 13){
        	this.props.onHandleSearch(event.target.value);
      	}
    }

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
	            {this.state.taskFound.map(task => (
		          <ul key={task.id}>
		            <li>{task.title}</li>
		          </ul>
		        ))}
          </div>
        );
        
    }
}

SearchTask.propTypes = {
	onHandleSearch: PropTypes.func,
	taskFound: PropTypes.array
}
