import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {cyan100, blue200, blueGrey200} from 'material-ui/styles/colors'

class ModalTest extends Component {

constructor(props){
 	super(props);

 	this.handleClose = this.handleClose.bind(this);
	this.handleOpen = this.handleOpen.bind(this);

 	this.state={
 		open:false,
 		loading:false,
 	}
 }

 expandContent(){
 		// return(
 		// 	<ExpandTransition loading={false} open={true}>
   //    	<h3>Hello</h3>
   // 		</ExpandTransition>
 		// )
 	alert('Im inside modal')
 }

 handleClose(){
 	this.setState({open: false})
 }

	handleOpen(){
		this.setState({open: true})
	}

	render(){
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleClose}
	      />,
	      <RaisedButton label="Go"  onClick={this.expandContent}/>
	     ];
		return(
			<div>
				<RaisedButton label="Sign Up" onTouchTap={this.handleOpen} />
				<Dialog 
					title="Sign up"
					// style={{backgroundColor: blue200}}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}>
					<RaisedButton label="Sign up to work!" fullWidth={true} backgroundColor={blue200} onClick={this.expandContent}/>
					<br />
					<br />
					<RaisedButton label="Sign up to post work!" fullWidth={true} backgroundColor={blue200} href="#/receiver"/>
				</Dialog>
			</div>
		)	
	}
}
 
export default ModalTest;