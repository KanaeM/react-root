import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ProviderTabs from '../Components/ProviderTabs';

import helpers from '../helpers';

class ProviderPage extends Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			details : []
		}
	}

	handleClick() {
		helpers.getProvider()
			.then(function(providers){
				this.state.details = providers
				for (var i=0; i<providers.data.length; i++){
					console.log('ProviderPage - handleClick ', providers.data[i].firstName)
				}
			}.bind(this))
		console.log('ProviderPage - handleClick')
	}

	componentDidMount() {
		console.log('ProviderPage - componentDidMount');
		this.handleClick()
	}

	componentDidUpdate() {
		console.log('ProviderPage - componentDidUpdate');
	}


	render() {

		const { login, user, url } = this.props;
		var component;
		if(url !== 'providers'){
			// component = <RaisedButton label="login" onClick={this.handleClick}/>
			component = (
				<div className="container">
				  <h2>Welcome {user.userName}</h2>
				  <p>if you would like to become a service provider, please register</p>
				</div>
			)

		} else {
			if(!login) {
				component =	(
					<div className="container">
					  <h2>Welcome Provider</h2>
					  <p>Please log in </p>
					</div>
				)

			} else {
				component = 
				(
					<div className="container">
					  <h2>Welcome {user.userName}</h2>
					  <p>loading ......</p>
					  <ProviderTabs login={login} user={user} />
					</div>
				)
			}

		}
		

		return (
			<div className="providerPage">
				
 				{	
 					component

			  }

			</div>
						
		);
	}
}

export default ProviderPage;