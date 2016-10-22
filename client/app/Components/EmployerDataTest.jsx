import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import helpers from '../helpers';

const style = {
  margin: 12,
};

class EmployerDataTest extends Component {

	constructor(props){
	super (props);

// this.nameChange = this.nameChange.bind(this)
// this.lastNameChange = this.lastNameChange.bind(this)
this.handleClick = this.handleClick.bind(this)

	this.state = {
		firstName: '',
		lastName: '',
		company:'',
		address1: '',
		address2: '',
		city: '',
		state: '',
		email: '',
		password:'',
	}
}


getData(field, event){
	const employerInfo = {};
	employerInfo[field] = event.target.value;
	this.setState(employerInfo);

}


handleClick(){
 console.log(this.state);
 var newEmployer = this.state
 console.log("saving new user now", newEmployer);
	helpers.postEmployer(newEmployer)
		.then(function(data){
			console.log('this is the data on employer post', data)
			this.state
		}.bind(this))

}

handleChange(event, index, value) { 
	this.setState({value})
}

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
		    	hintText="Company name"
		    	fullWidth={true}
		    	onChange = {this.getData.bind(this, 'company')}
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
     		<RaisedButton label="Default" onClick={this.handleClick}  style={style} />
     		</form>
			</div>			
		)
	}


}

export default EmployerDataTest;

  	// <DropDownMenu value={this.state.value} onChange={this.handleChange} >
     //    	<MenuItem value={1} primaryText="Select One" />
     //    	<MenuItem value={2} primaryText="Morning" />
     //    	<MenuItem value={3} primaryText="Weeknights" />
     //    	<MenuItem value={4} primaryText="Weekends" />
     //   	 	<MenuItem value={5} primaryText="Every Day" />
     // 		</DropDownMenu>
     		// <br />