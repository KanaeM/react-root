import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import CardProvider from '../Components/CardProvider'

class ProviderPage extends Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			
		}
	}
	handleClick() {
		var usr = (this.props.user.userName === undefined) ? 'robin' : {}
		this.props.authenticate(usr, 'providers')	// receivers
		console.log('ProviderPage - this.props.user.name ', this.props.user.userName)
	}

	componentDidMount() {
		console.log('ProviderPage - componentDidMount - P');
		console.log('ProviderPage - this.props.user.name ', this.props.user.name)
	}

	componentDidUpdate() {
		console.log('ProviderPage - componentDidUpdate - P');
		console.log('user', this.props.user)
	}


	render() {
		const { user } = this.props;
		var component;
		if(!user){
			component = <RaisedButton label="login" onClick={this.handleClick}/>
		} else {
			component = <RaisedButton label="logout" onClick={this.handleClick}/>
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