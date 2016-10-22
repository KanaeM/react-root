import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalTest from '../Components/ModalTest';

class ModalPage extends Component {
	
	render() {
		return (
			
			<MuiThemeProvider>
			<div>
				<ModalTest />
			</div>
			</MuiThemeProvider>
			
		);
	}
}
export default ModalPage;