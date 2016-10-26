import React, {Component} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import CheckMark from 'material-ui/svg-icons/action/done';
import helpers from '../helpers';
import {cyan100, blue200, blueGrey200, lightGreenA700} from 'material-ui/styles/colors';

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

let requests=[];
let chosenArray=''

class FinishedRequest extends Component {
	constructor(props){
		super(props);
		
		this.requestDetails = this.requestDetails.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		// this.checkStatus = this.checkStatus.bind(this);
		
		this.state = {
      height: '450px',
      openModal: false,
      completedTasks: [
      	{
      		task: "hello",
      		city: "this works"
      	}
      ]
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

  handleChange(event){
    this.setState({height: event.target.value});
  }

  //get details from selected tasks on the table
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
	        >
	        	<div>
	        		<Card>
						    <CardHeader
						      title={user.requests[chosenArray].task}
						      subtitle="Subtitle"
						      actAsExpander={true}
						      showExpandableButton={true}
						    />
						    <CardText expandable={true}>
						    	<h4>Description</h4>
						    	<p>{user.requests[chosenArray].description}</p>
						    	<h4 style={{marginTop: 20}}>Status</h4>
						    	<CheckMark style={{size: 50}} color={lightGreenA700} />
						    </CardText>
  						</Card>	          	
	          </div>
	        </Dialog>
	      </div>
	    );
  	}
	}

	componentDidUpdate(prevProps, prevState){
	 	let {user} = this.props
	  if (prevState.completedTasks !== this.state.completedTasks){
	    console.log("Requests has changed componentDidUpdate")
	    // this.setState({completedTasks: user.requests})
	    for(var i=0; i<user.requests.length; i++){
				if(user.requests[i].status.done === true){
					// requests.push(user.requests[i]);
					this.setState({completedTasks: user.requests[i]});
					console.log("this is the new statefrom update", this.state)
				}
			}
	  }
 	}

  componentDidMount(){
  	const {user} = this.props;
		for(var i=0; i<user.requests.length; i++){
			if(user.requests[i].status.done === true){
				console.log("USERREQUEST",user.requests[i])
				// requests.push(user.requests[i]);
				this.setState({completedTasks: user.requests[i]});
				console.log("finishedrequest state:", this.state)
			}else{
				console.log("all tasks are still active")
			}
		}	
  }

	render(){

		const {user} = this.props

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
	                <h2 style={{marginTop:30}}>Assignment History</h2>
	              </TableHeaderColumn>
	            </TableRow>
	            <TableRow>
	              <TableHeaderColumn tooltip="ID">Num</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Task Name">Task</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Assigned Date and Time">Date & Time</TableHeaderColumn>
	              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
	            </TableRow>
	          </TableHeader>
	          <TableBody
	            displayRowCheckbox={false}
	            showRowHover={true}
	            stripedRows={true}
	          >
	            {this.props.user.requests.map( (row, index) => (
	              <TableRow key={index} selected={row.selected} >
	                <TableRowColumn>{index}</TableRowColumn>
	                <TableRowColumn>{row.task}</TableRowColumn>
	                <TableRowColumn>{row.city}</TableRowColumn>
	                <TableRowColumn>Done</TableRowColumn>
	              </TableRow>
	              ))}
	          </TableBody>
	        </Table>
	      </div>
	    </div>
    );
	}
}

export default FinishedRequest;