import React, {Component} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CheckMark from 'material-ui/svg-icons/action/done';
import helpers from '../receiverhelpers';
import AvailableUsersTable from './AvailableUsersTable';

// const styles = {
//   propContainer: {
//     width: 200,
//     overflow: 'hidden',
//     margin: '20px auto 0',
//   },
//   propToggleHeader: {
//     margin: '20px auto 10px',
//   },
// };

let chosenArray = '';

class CurrentRequest extends Component {
	constructor(props){
		super(props);
		
		this.requestDetails = this.requestDetails.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		// this.checkStatus = this.checkStatus.bind(this);
		
		this.state = {
      height: '450px',
      openModal: false,
      incompleteTasks:[]
    };
	}

	handleOpen(num){
    this.setState({openModal: true});
    console.log(num)
    chosenArray=num
  };

  handleClose(){
    this.setState({openModal: false});
  };

	// handleToggle(event, toggled){
 //    this.setState({
 //      [event.target.name]: toggled,
 //    });
 //  }

  handleChange(event){
    this.setState({height: event.target.value});
  }

  //get details from the selected tasks
	requestDetails(num, key, data){
  	const {user} = this.props
  	console.log("you clicked", key)
  	if (this.state.openModal === true){
  		const actions = [
		    <FlatButton
		      label="OK"
		      primary={true}
		      disabled={false}
		      onTouchTap={this.handleClose}
		    />
		  ];
  		return(
	      <div>
	        <Dialog
	          title="More Information"
	          actions={actions}
	          modal={true}
	          open={this.state.openModal}
            autoScrollBodyContent={true}
            autoDetectWindowHeight={true}
	        >
	        	<div>
	        		<Card>
						    <CardHeader
						      title="Task Info"
						      subtitle={user.requests[chosenArray].task}
						      actAsExpander={true}
						      showExpandableButton={true}
						    />
						    <CardText expandable={true}>
						    	<h4>Location</h4>
						    	<p>{user.requests[chosenArray].city}</p>
						    	<h4 style={{marginTop: 20}}>Date & Time</h4>
						    	<p>{user.requests[chosenArray].date}      @ {user.requests[chosenArray].time}</p>
						    	<h4 style={{marginTop: 20}}>Description</h4>
						    	<p>{user.requests[chosenArray].description}</p>
						    	<h4 style={{marginTop: 20}}>Status</h4>
						    	<p>Available</p>
						    </CardText>
  						</Card>	
  						<Card>
  							<CardHeader
						      title="Available Users"
						      subtitle="Choose a user from the list below"
						      actAsExpander={true}
						      showExpandableButton={true}
						    />
						    <CardText expandable={true}>
						    	<AvailableUsersTable />
						    </CardText>
  						</Card>

	          </div>
	          
	        </Dialog>
	      </div>
	    );
  	}
	}

	componentDidUpdate(prevProp, prevState){
		if (prevState.incompleteTasks !== this.state.incompleteTasks){
			this.componentDidMount();	
		}
	}

  componentDidMount(){
  	const {user} = this.props;
  		for(var i=0; i<user.requests.length; i++){
  			if(user.requests[i].status.done === false){
  				console.log("this.props.user.requests", user.requests[i])
  				// requests.push(user.requests[i]);
  				this.setState({incompleteTasks: user.requests[i]});
  				console.log("current request state:", this.state)
  			}else{
  				console.log("all assignments are done")
  			}
  		}
  }

	render(){
		let {user} = this.props
		const {incompleteTasks} = this.state
		return (
			<div>
				<div>
	      	{this.requestDetails()}
	      </div>
	      <div>
	        <Table
	          height={this.state.height}
	          fixedHeader={true}
	          selectable={true}
	          onCellClick={this.handleOpen}
	        >
	          <TableHeader
	            displaySelectAll={false}
	            adjustForCheckbox={false}
	          >
	            <TableRow>
	              <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}} >
	                <h2 style={{marginTop:30}}>Current Requests</h2>
	              </TableHeaderColumn>
	            </TableRow>
	            <TableRow>
	              <TableHeaderColumn tooltip="ID">Num</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Task Name">Task</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Assigned Date and Time">City</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
	            </TableRow>
	          </TableHeader>
	          <TableBody
	            displayRowCheckbox={false}
	            showRowHover={true}
	            stripedRows={true}
	          >
	            {user.requests.map( (row, index) => (
	              <TableRow key={index} selected={row.selected} >
	                <TableRowColumn>{index}</TableRowColumn>
	                <TableRowColumn>{row.task}</TableRowColumn>
	                <TableRowColumn>{row.city}</TableRowColumn>
	                <TableRowColumn>Available</TableRowColumn>
	              </TableRow>
	              ))}
	          </TableBody>
	        </Table>
	      </div>
	    </div>
    );
	}
}

export default CurrentRequest;