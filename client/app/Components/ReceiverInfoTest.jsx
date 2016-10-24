import React, {Component} from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import helpers from '../helpers';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ReceiverInfoPage extends Component {

 constructor(props){
 	super(props);

 	this.handleNext = this.handleNext.bind(this);
 	this.handlePrev = this.handlePrev.bind(this);
  this.postInfo = this.postInfo.bind(this);
  this.handleDropdown = this.handleDropdown.bind(this);

 	this.state ={
    loading: false,
    finished: false,
    stepIndex: 0,
    password: '',
    task: '',
    city: '',
    time: '',
    date: '',
    description:'',
    login: false,
    modalOpen: false,
    modalLoading: false,
    dropdownValue: "none",
    available:[{
      userId: '',
      fullName: ''
    }]
  };
 }

 componentDidUpdate(prevProps, prevState){
  if (prevState.time !== this.state.time){
    console.log("Time has changed componentDidUpdate")
    helpers.getProvider()
      .then(function(providers){
        for (var i=0; i<providers.data.length; i++){
          console.log("getting into the for loop")
          console.log(providers.data[i].firstName)
          // this.setState({available.userId:providers.data[i]._id});
          // this.setState({available.fullName:providers.data[i].firstName+" "+providers.data[i].lastName});
          console.log(this.state.available)   
        }
      }.bind(this))
  }
 }

//  componentDidMount(){
//     if (this.state.time !== "" && this.state.date !== ""){
    
//   }
// }

//this will show a table with compatible providers on the "Post a Job" tab
 providerTable(){
   if (this.state.time !== "" && this.state.date !== ""){  
    return(
      <div>
        <h1 style={{marginTop:40, textAlign:"center"}}>Available users</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.available.map( (row, index) => (
              <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.userId}</TableRowColumn>
                <TableRowColumn>{row.fullName}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  } 
 

  dummyAsync(cb){
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

//For Material UI Stepper
  handleNext(){
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      }));
    }
  }

    handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  
  }

  getServiceInfo(field, event){
    const receiverRequest = {};
    if (this.state.login === false && this.state.stepIndex === 2){
      receiverRequest[field] = event.target.value;
      console.log("You are not logged in, but here is your job post", receiverRequest);

    } else{
    this.setState(receiverRequest)
    console.log("Your data has been sent")
    }
}

  getTime(blank, other, time){
    console.log(time);
    this.setState({time: time})
  }

  getDate(blank, other, date){
    console.log(date);
    this.setState({date: date})
  }

  getReceiverInfo(field, event){
    const receiverInfo = {};

    receiverInfo[field] = event.target.value
     console.log(receiverInfo)
    this.setState(receiverInfo)
  }

//Once Logged in, this will post the new task to the Receiver table
 postInfo(){
  const {userName}=this.props
  if (this.state.stepIndex === 2){
    console.log("The new state for task pushInfo()", this.state)
    var newTask = this.state
    console.log("newtasks in postInfo", newTask)
    helpers.postTask(newTask, userName)
      .then(function(data){
        console.log("saving receivers now from jsx", data)
        console.log("this is the postTask userName", userName)
      }.bind(this))
  }
}


  handleDropdown(event, index, value) {
    console.log(value)
    this.setState({dropdownValue: value});
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        	<div>
          	<h4>Job Details</h4>
            <TextField
              id='text-field-controlled'
              floatingLabelText="Task"
              className = "task"
              style={{marginRight: 40}}
              onChange={this.getReceiverInfo.bind(this, "task")}
            />
            <DropDownMenu value={this.state.dropdownValue} onChange={this.handleDropdown}>
              <MenuItem value="none" primaryText="Choose a category" />
              <MenuItem value="Mechanic" primaryText="Mechanic" />
              <MenuItem value="Cleaning" primaryText="Cleaning" />
              <MenuItem value="Office" primaryText="Office Help" />
              <MenuItem value="Delivery" primaryText="Delivery" />
              <MenuItem value="Volunteer" primaryText="Volunteer" />
              <MenuItem value={7} primaryText="" />
            </DropDownMenu>
             <TextField
              id='text-field-controlled'
              floatingLabelText="City"
              className = "city"
              style={{marginRight: 20}}
              onChange={this.getReceiverInfo.bind(this, "city")}
            />
            <br />
           
            <TextField
              hintText="Job Description"
              floatingLabelText="Job Description"
              fullWidth={true}
              multiLine={true}
              rows={4}
              rowsMax={10}
              onChange={this.getServiceInfo.bind(this, "description")}
            /><br />

          </div>
        );
      case 1:
        return (
          <div>
            <TimePicker
              hintText="Assignment Time"
              onChange={this.getTime.bind(this, "time")}
              format="ampm"
            />
            <DatePicker 
              hintText="Assignment Date" 
              onChange={this.getDate.bind(this, "date")}
              formatDate={this.formatDate}
            />
          </div>
        );
      // case 2:
      //     return (
      //       <div>
      //         <TextField
      //           id='text-field-controlled'
      //           floatingLabelText="Username"
      //           style={{marginRight: 20}}
      //           onChange={this.getServiceInfo.bind(this, "userName")}
      //         /><br />
      //         <TextField
      //           hintText="Password"
      //           floatingLabelText="Password"
      //           type="password"
      //           onChange={this.getReceiverInfo.bind(this, "password")}
      //         /><br />
      //       </div>
      //     );
        case 2:
          return (
            <div>
              <h3>Great! Press Submit to post your job!</h3>
            </div>
          );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <h3 style={{marginBottom: 20}}>Thank you for filling out the job post! We will contact you once you are connected with a candidate.</h3>
            <RaisedButton
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
                
              }}
            >
              Add Another
            </RaisedButton>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Submit' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
            onClick={this.postInfo}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div>
        <div className="well" style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step completed={false}>
              <StepLabel>Job Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Submit</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
        <div>
          {this.providerTable()}
        </div>
      </div>
    );
  }
}
export default ReceiverInfoPage;

