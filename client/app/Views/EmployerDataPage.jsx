import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmployerDataTest from '../Components/EmployerDataTest';

class EmployerDataPage extends Component {
	
	render() {
		console.log('Employer Page', this.props);
		return (
			
			<MuiThemeProvider>
			<div>
				<EmployerDataTest />
			</div>
			</MuiThemeProvider>
			
		);
	}
}
export default EmployerDataPage;