import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan100, blue200, blueGrey200} from 'material-ui/styles/colors'

const style = {
	paper: {
	height: '100%', //550,
	width: '100%', //1075,
	margin: 10,
	// textAlign: 'center',
	backgroundColor: "#F7F2F7",

	},
	custom: {
		height: 525,
		width: 750,
	}
};

class MainPage extends Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log('MainPage - handleClick')
		const route = '/receivers'
		browserHistory.push(route);
	}

	render() {
		
		return (
				<Paper className="MainPage" style={style.paper} zDepth={5} onClick={this.handleClick} >
					<div className="jumbotron">
					  <h1>Welcome to JADE</h1>
					  <p>Job Aid Discovery Engine - Connecting people through jobs</p>
					  <h4>Please log-in once you are ready</h4>
					</div>

					<div className="container">
					  <p>Post jobs to get help for any tasks, from a big pool of users</p>
					  <p>Find a variety of job posts.. from quick paying everyday tasks to volunteer work you can do on your spare time</p>
					</div>
				</Paper>
		);
	}
}
export default MainPage;