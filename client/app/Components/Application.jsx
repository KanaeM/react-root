import React, { Component, cloneElement } from 'react';
import helpers from '../helpers';
import {Link} from 'react-router';

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
			url: 'receivers'
		}
	}

	handleOpenSignInModal(event) {
		if(!this.state.login) {
			this.setState({signInModalOpen: true})
		} else {
			this.setState({	user: {}, login: false})
		}
	}

	handleSignInModal(open, usr){
		this.setState({signInModalOpen: open})
		this.setState({user: usr})
		console.log('application - handleSignInModal - provider: ', usr.provider);
		if(usr.provider) {
			console.log('handleSignInModal url: ', this.state.url)
			this.setState({url: 'providers'})	// Does not work since setState is asyn -> http://stackoverflow.com/questions/30852251/react-native-this-setstate-not-working
			this.state.url = 'providers'
			console.log('handleSignInModal url: ', this.state.url)
		}
		this.authenticate(usr)
		// console.log('application - handleSignInModal: ', this.state.signInModalOpen)
	}
	
	authenticate(user) {
		console.log('application - authenticate - user: ', user, this.state.url);

		if(typeof user.name !== 'undefined'){
			helpers.getUser(user.name, this.state.url)
				.then(function(usr){
					if(usr) {
							this.setState({	user: usr, login: true})
							console.log('application - authenticate - usr: ', usr)
					} else {
						this.setState({	user: {}, login: false})
					}
				}.bind(this))
		}
	}
 
	componentDidUpdate(prevProps, prevState) {
		console.log('application - componentDidUpdate')
		console.log('application - componentDidUpdate - user: ', this.state.user);
		// TODO : Check DB for updated data if needed
	}

	componentDidMount() {
		console.log('application - componentDidMount');
		console.log('application - user: ', this.state.user);
		// TODO : setTimeOut(updateDate, time)
	}


	render() {
		const { children } = this.props;
		const {login, user, url, signInModalOpen} = this.state;
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
								{/*<li><MuiThemeProvider><div><RaisedButton backgroundColor= {'pink'} onTouchTap={this.handleOpenSignInModal}>{!this.state.login && 'login'} {this.state.login && (<span className="glyphicon glyphicon-log-in" > {user.userName}</span>)} </RaisedButton> </div></MuiThemeProvider></li>*/}
								<li><Link to="/receivers" activeClassName="active"> Receivers</Link></li>
								<li><Link to="/providers" activeClassName="active"> Providers</Link></li>
								<li><Link to ='' activeClassName="active" onTouchTap={this.handleOpenSignInModal}>{!this.state.login && 'login'} {this.state.login && (<span className="glyphicon glyphicon-log-in"> {user.userName} </span>)}</Link></li>
							</ul>
						</div>
					</nav>
					<MuiThemeProvider className="text-center">
						<div className="row" style={{height:'100%'}}>
							<Paper className="paper" style={style} zDepth={5}>
								<SingInModal signInModalOpen={signInModalOpen} handleSignInModal={this.handleSignInModal}/>
									{
										cloneElement(children, {
											user: user,
											login: login,
											url: url
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
