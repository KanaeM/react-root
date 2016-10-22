import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReceiverInfoTest from '../Components/ReceiverInfoTest';

class ReceiverInfoPage extends Component {
	
	render() {
		console.log('User Page', this.props);
		return (
			
			<MuiThemeProvider>
			<div>
				<ReceiverInfoTest />
			</div>
			</MuiThemeProvider>
			
		);
	}
}
export default ReceiverInfoPage;