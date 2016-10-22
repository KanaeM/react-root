import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserDataTest from '../Components/UserDataTest';

class UserDataPage extends Component {
	
	render() {
		console.log('User Page', this.props);
		return (
			
			<MuiThemeProvider>
			<div>
				<UserDataTest />
			</div>
			</MuiThemeProvider>
			
		);
	}
}
export default UserDataPage;