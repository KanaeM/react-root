import React, { Component } from 'react';
import ButtonRaise from '../Components/ButtonRaise';
import DatePickerTest from '../Components/DatePickerTest';
import TextFieldTest from '../Components/TextFieldTest';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

import { Router, browserHistory } from 'react-router';

// const css = {
// 	title: {
// 		cursor: 'pointer',
// 	},
// };

class MaterialPage extends Component {

	constructor(props){
		super(props);
		this.state = {css: {
			title: { cursor: 'pointer'},
			button: { 'color': 'white'}
		}}
		this.handleTouchTap = this.handleTouchTap.bind(this);
		// this.handleClick = this.handleClick.bind(this);
	}

	//	TODO
	//	http://frontendinsights.com/role-based-authorization-using-react-router/
	//	http://www.tech-dojo.org/#!/articles/5697fd5ddb99acd646dea1aa
	handleTouchTap(e) {
		alert('onTouchTap triggered on the title component');
		console.log('event 1: ', e.target.innerHTML);
		console.log('event 2: ', e.target.getAttribute('id'));
		console.log('event 3: ', e.target.attributes.getNamedItem('id'));
		this.setState({ css: {
			title : { color:'green' },
			button : {'borderStyle': 'solid', 'borderWidth':'1px'}
			}
		})
		// css.title = {
		// 		color: 'red'
		// 	}
	}

	handleClick(e, id) {
		// e.preventDefault()
		// e.persist();
		console.log('event', e.native);
		alert('I was clicked '+ e.target.id);
		

	}

	componentWillMount() {
		// check if user data available
		const authorized = true;
		if (!authorized) {
			browserHistory.push('/');
		}
	}

	render() {
		console.log('Material Page', this);
		return (
			<MuiThemeProvider >
				<div>
					<AppBar
					title={<span style={this.state.css.title}>Title</span>}
					onTitleTouchTap={this.handleTouchTap}
					iconElementLeft={<IconButton><NavigationClose /></IconButton>}
					iconElementRight={
								<FlatButton label="Login" style={this.state.css.button} id='login' onTouchTap={this.handleTouchTap}/>
							}/>

					<DatePickerTest />
					<TextFieldTest />
				</div>
			</MuiThemeProvider>
			
		);
	}
}
export default MaterialPage;
