import React, { Component, cloneElement } from 'react';
import helpers from '../helpers';
import {Link} from 'react-router';
import ArticleList from './ArticleList';
import History from './History';

import SingInModal from './SingInModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
		this.handleSignInModal = this.handleSignInModal.bind(this);
		this.handleOpenSignInModal = this.handleOpenSignInModal.bind(this);

		this.state = {
			signInModalOpen: false,
			login: false,
			user: {},
		}
	}

	handleOpenSignInModal(event) {
		this.setState({signInModalOpen: true})
	}

	handleSignInModal(open, usr){
		this.setState({signInModalOpen: open})
		this.setState({user: usr})
		this.authenticate(usr.name, 'providers')
		console.log('application - handleSignInModal: ', this.state.signInModalOpen)
		console.log('application - user', usr.name)
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
		console.log('application - componentDidUpdate')
		console.log('application - user: ', this.state.user);
		// TODO : Check DB for updated data if needed
	}

	componentDidMount() {
		console.log('application - componentDidMount');
		console.log('application - user: ', this.state.user);
		// TODO : setTimeOut(updateDate, time)
	}


	render() {
		const { children } = this.props;
		const {login, user, authenticate, signInModalOpen} = this.state;
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
								<li><MuiThemeProvider><div><RaisedButton onTouchTap={this.handleOpenSignInModal}>{!this.state.login && 'login'} {this.state.login && (<span className="glyphicon glyphicon-log-in" > {user.userName}</span>)} </RaisedButton> </div></MuiThemeProvider></li>
								<li><Link to="/provider" activeClassName="modal"> Post a Job!</Link></li>
								<li><Link to ='/modal' activeClassName="modal">{!this.state.login && 'login'} {this.state.login && (<span className="glyphicon glyphicon-log-in" > Welcome {user.userName}</span>)}</Link></li>
							</ul>
						</div>
					</nav>
					<MuiThemeProvider className="text-center">
						<div className="row" style={{height:'100%'}}>
							<Paper  style={style} zDepth={5}>
								<SingInModal signInModalOpen={signInModalOpen} handleSignInModal={this.handleSignInModal}/>
									{
										cloneElement(children, {
											user: user,
											login: login,
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
