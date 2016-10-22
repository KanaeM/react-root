import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import CardProvider from '../components/CardProvider'

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
		console.log('this.props.user.name ', this.props.user.userName)
	}

	componentDidMount() {
		console.log('componentDidMount - P');
		console.log('this.props.user.name ', this.props.user.name)
	}

	componentDidUpdate() {
		console.log('componentDidUpdate - P');
		console.log('user', this.props.user)
	}


	render() {
		const { user } = this.props;
		var component;
		if(user.userName === undefined){
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