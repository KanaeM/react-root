import React, { Component, cloneElement } from 'react';
import helpers from '../helpers';
import {Link} from 'react-router';
import ArticleList from './ArticleList';
import History from './History';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const style = {
	height: 600, //600,
	width: '95%', //1120,
	margin: 20,
	textAlign: 'center',
	display: 'inline-block',
};

 
class Application extends Component {

	constructor(props){
		super(props);

		this.authenticate = this.authenticate.bind(this);
		this.handleOpen = this.handleOpen.bind(this);

		this.state = {
			open: false,
			login: false,
			user: {},
		}
	}

	handleOpen(event){
		this.setState({open: this.state.open})
		console.log('application-handleOpen: ', this.state.open)
	}
	
	authenticate(user, route) {
		console.log('authenticate -> ', user);
		helpers.getUser(user, route)
			.then(function(usr){
				if(usr) {
						this.updateState(usr);
						console.log('user: ', usr.password)
				} else {
					this.setState({	user: {}, login: false})
				}
			}.bind(this))
	}

	updateState(usr) {
		this.setState({	user: usr, login: true})
	}


	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdate')
		console.log('user: ', this.state.user);
		// TODO : Check DB for updated data if needed
	}

	componentDidMount() {
		console.log('componentDidMount');
		console.log('user: ', this.state.user);
		// TODO : setTimeOut(updateDate, time)
	}


	render() {
		const { children } = this.props;
		const {login, user, authenticate, open} = this.state;
		return (
				<div className="Application">
					<nav className="navbar">
						<div className="container-fluid">
							<ul className="nav navbar-nav">
								<li>
									<Link to="/" activeClassName="active"><span className="glyphicon glyphicon-home"></span></Link>
								</li>
								<div className="navbar-header">
									<span className="navbar-brand" to="/">Opportunities Find something make a difference</span>
								</div>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/provider" activeClassName="modal"> Post a Job!</Link></li>
								<li><Link to ='/modal' activeClassName="modal">{!this.state.login && 'login'} {this.state.login && (<span className="glyphicon glyphicon-log-in" onClick={this.handleOpen}> Welcome {user.userName}</span>)}</Link></li>
							</ul>
						</div>
					</nav>
					<MuiThemeProvider className="text-center">
						<div className="row" style={{height:'100%'}}>
							<Paper  style={style} zDepth={5}>
									{
										cloneElement(children, {
											user: user,
											login: login,
											open: open,
											authenticate: this.authenticate
										})
									}
							</Paper>
						</div>
					</MuiThemeProvider>
				</div>
		);

	}
}

export default Application;
