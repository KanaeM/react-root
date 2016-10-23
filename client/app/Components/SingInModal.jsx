import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {cyan100, blue200, blueGrey200, blue500, orange500} from 'material-ui/styles/colors'

// const styles = {
// 	errorStyle: {
// 		color: orange500,
// 		display: 'none'
// 	},
// 	underlineStyle: {
// 		borderColor: orange500,
// 	},
// 	floatingLabelStyle: {
// 		color: orange500,
// 	},
// 	floatingLabelFocusStyle: {
// 		color: blue500,
// 	},
// };


const customContentStyle = {
	width: '25%',
	maxWidth: 'none',
};

class SingInModal extends Component {

	constructor(props){
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state={
			open: false,
			user: {name:'', password:''}
		}
	}
	
	handleChange (event){
		console.log(event.target.id)	//Works
		if(event.target.id === 'username') {
			this.setState({
				user: {name: event.target.value, password: this.state.user.password}
			});
		}
		if(event.target.id === 'password') {
			this.setState({
				user: {name: this.state.user.name, password: event.target.value}
			});
		}
		console.log('user: ', this.state.user)
	}
	
	handleSubmit(){
		// alert('user.name: ' + this.state.user.name)
		// alert('user.password: ' + this.state.user.password)
		this.setState({open: false})

		this.props.handleSignInModal(false, this.state.user)
		this.setState({user: {name: '', password: ''}});
		console.log('SingInModal - handleSubmit: ', this.state.user)
	}

	handleClose(){
		// this.setState({open: false})
		this.setState({user: {name: '', password: ''}});	// Doesnot work right away it exec after close
		console.log('SingInModal - handleClose: ', this.state.user)
		this.props.handleSignInModal(false, {})
	}

	handleOpen(){
		console.log('SingInModal - handleOpen')
		// this.props.handleSignInModal(true, this.state.user)
		// this.setState({open: true})
	}

	componentWillMount() {
		console.log('props', this.props.open)
		// this.setState({open: this.props.open})
	}

	render(){
		const {signInModalOpen} = this.props
		const actions = [
				<RaisedButton
					label="Cancel"
					secondary={true}
					// keyboardFocused={true}
					onTouchTap={this.handleClose}/>,
				'  ',
				<RaisedButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit}/>
			 ];
		return(
			<div>
				{/*<RaisedButton label="Sign In" onTouchTap={this.handleOpen} /> */}
				<Dialog 
					title="Sign In"
					// style={{backgroundColor: blue200}}
					actions={actions}
					// modal={false}
					open={signInModalOpen}
					contentStyle={customContentStyle}
					// autoScrollBodyContent={false}
					onRequestClose={this.handleClose}>
						 <TextField
							// hintText="Please Enter Password"
							floatingLabelText="User Name"
							hintText="user name"
							value={this.state.user.name}
							onChange={this.handleChange}
							id='username'
							// {errorText="This field is required."
							// errorStyle={styles.errorStyle}
						/>					
						<br />
						<TextField
							floatingLabelText="Password"
							hintText="password"
							value={this.state.user.password}
							onChange={this.handleChange}		
							id="password"
							type="password"
						/>
						<br />					
					
				</Dialog>
			</div>
		)	
	}
}
 
export default SingInModal;