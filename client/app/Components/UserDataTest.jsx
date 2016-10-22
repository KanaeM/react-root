import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import helpers from '../helpers';

const buttonStyle = {
  margin: 12,
};

const checkStyle = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class UserDataTest extends Component {

	constructor(props){
	super (props);


this.handleClick = this.handleClick.bind(this)

	this.state = {
		firstName: '',
		lastName: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		email: '',
		phone: '',
		password:'',
		availability: [],
		service: []
	}
}

getData(field, event){
	const userInfo = {};
	userInfo[field] = event.target.value;
	this.setState(userInfo)
}

getAvailability(field, event){
	console.log("Get availability field", event)
}

handleClick(){
 console.log(this.state)
 var newUser = this.state
 console.log("saving new user now", newUser);
	helpers.postUser(newUser)
		.then(function(data){
			console.log('this is the data on user post', data)
			this.state
		}.bind(this))

}

// handleChange(event, index, value) { 
// 	this.setState({service: value});
// }

	render(){
		return(
			<div>
			 <form> 
				<TextField
		    	hintText="First Name"
		   		floatingLabelText="First Name"
		   		onChange = {this.getData.bind(this, 'firstName')}
		   		className="firstName"
		  	/><br />
		 		<TextField
		    	hintText="Last Name"
		    	floatingLabelText="Last Name"
		    	onChange = {this.getData.bind(this, 'lastName')}
		  	/><br />
		  	<TextField
		    	hintText="Address 1"
		    	fullWidth={true}
		    	onChange = {this.getData.bind(this, 'address1')}
		  	/><br />
		  	<TextField
		    	hintText="Address 2"
		    	fullWidth={true}
		    	onChange = {this.getData.bind(this, 'address2')}
		  	/><br />
		  	<TextField
		    	hintText="City"
		    	floatingLabelText="City"
		    	onChange = {this.getData.bind(this, 'city')}
		  	/><br />
		  	<TextField
		    	hintText="State"
		    	floatingLabelText="State"
		    	onChange = {this.getData.bind(this, 'state')}
		  	/><br />
		  	<TextField
		    	hintText="Email"
		    	floatingLabelText="Email"
		    	onChange = {this.getData.bind(this, 'email')}
		  	/><br />
				<TextField
		    	hintText="Password"
		   		floatingLabelText="Password"
		    	type="password"
		    	onChange = {this.getData.bind(this, 'password')}
		  	/><br />
		  	<br />
		  	<div style={checkStyle.block} >
    			<Checkbox
     				label="Every Day"
     				value="Every Day"
      			style={checkStyle.checkbox}
      			onCheck={this.getAvailability}
    			/>
    			<Checkbox
     				label="All Weekdays"
      			style={checkStyle.checkbox}
      			onCheck={this.getAvailability}
    			/>
    			<Checkbox
     				label="All Weekends"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Monday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Tuesday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Wednesday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Thursday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Friday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Saturday"
      			style={checkStyle.checkbox}
    			/>
    			<Checkbox
     				label="Sunday"
      			style={checkStyle.checkbox}
    			/>
    		</div>
		  
     		<RaisedButton label="Submit" onClick={this.handleClick}  style={buttonStyle} />
     		</form>
			</div>			
		)
	}


}

export default UserDataTest;




	// <DropDownMenu value={this.state.service[0]} onChange={this.handleChange} >
 //        		<MenuItem value={1} primaryText="Select One" />
 //        		<MenuItem value={2} primaryText="Morning" />
 //        		<MenuItem value={3} primaryText="Weeknights" />
 //        		<MenuItem value={4} primaryText="Weekends" />
 //       	 		<MenuItem value={5} primaryText="Every Day" />
 //     		</DropDownMenu>
 //     		<br />

