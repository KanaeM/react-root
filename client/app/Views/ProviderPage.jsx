import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import CardProvider from '../Components/CardProvider'

class ProviderPage extends Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state = {
			
		}
	}
	handleClick() {
		var usr = (this.props.user.userName === undefined) ? 'robin' : {}
		this.props.authenticate(usr, 'providers')	// receivers
		console.log('ProviderPage - handleClick')
		console.log('ProviderPage - handleClick - userName: ', this.props.user.userName)
	}

	componentDidMount() {
		console.log('ProviderPage - componentDidMount');
		console.log('ProviderPage - componentDidMount - userName: ', this.props.user.userName)
	}

	componentDidUpdate() {
		console.log('ProviderPage - componentDidUpdate');
		console.log('ProviderPage - componentDidUpdate - userName: ', this.props.user.userName)
	}


	render() {
		const { login, user } = this.props;
		var component;
		if(!login){
			// component = <RaisedButton label="login" onClick={this.handleClick}/>
			component = 
			(
					<div className="jumbotron">
					  <h2>Welcome Provider</h2>
					  <p>Please log in </p>
					</div>
			)

		} else {
			component = 
			(
					<div className="jumbotron">
					  <h2>Welcome {user.userName}</h2>
					  <p>loading ......</p>
					</div>
			)
		}
		

		return (
			<div>
 				{	
 					component

			  }

			</div>
						
		);
	}
}

export default ProviderPage;