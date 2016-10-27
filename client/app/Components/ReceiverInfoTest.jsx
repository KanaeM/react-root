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
import helpers from '../receiverhelpers';
import provHelpers from '../helpers'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import LoginAlertModule from './LoginAlertModule'

var t, d 
class ReceiverInfoPage extends Component {

 constructor(props){
  super(props);

  this.handleNext = this.handleNext.bind(this);
  this.handlePrev = this.handlePrev.bind(this);
  this.postInfo = this.postInfo.bind(this);
  this.handleDropdown = this.handleDropdown.bind(this);
  this.checkLogin = this.checkLogin.bind(this);

  this.state ={
    loading: false,
    finished: false,
    stepIndex: 0,
    password: '',
    task: 'none',
    city: '',
    time: '',
    date: '',
    description:'',
    login: false,
    modalOpen: false,
    modalLoading: false,
    openAlert: false,
    available:[],
    chosenUser:"",
    requestId:[]
  };
 }

 componentDidUpdate(prevProps, prevState){
  const {requestId} = this.state;
  if (prevState.time !== this.state.time){
    console.log("Time has changed componentDidUpdate")
    helpers.getProvider()
      .then(function(providers){
          this.setState({available: providers.data});
          console.log("the final state", this.state.available)   
      }.bind(this))
  }
  //This is where the request.ID connects to the code in providers
  if (prevState.requestId !== this.state.requestId){
    console.log("this is the requestID and the chosenUSer to send the info to", requestId)
    helpers.postTodo(requestId)
      .then(function(task){
        console.log("POST.TODO-infoTest:", task)
      }.bind(this))
  }
  if (prevProps.user.requests !== this.props.user.requests){
    console.log("the requests has change")
  }
 }

//  componentDidMount(){
//   const {user}=this.props
//    this.setState({newRequests: user.requests})
//    console.log("state after newRequests", this.state)
//   }
// }

//this will check if the recieiver is logged in while trying to post a job
checkLogin(row, id, value){
  const {available} = this.state
  console.log("available on table", available)
  console.log("login props check", this.props)
  this.setState({chosenUser: available[row].userName})
  
}

//this will show a table with compatible providers on the "Post a Job" tab
 providerTable(){
  let {available} = this.state
   if (this.state.time !== "" && this.state.date !== ""){  
    return(
      <div>
        <h3 style={{marginTop:40, textAlign:"center"}}>Please choose an available user</h3>
        <Table
          onCellClick={this.checkLogin}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>UserName</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            showRowHover={true}
          >
            {available.map( (row, index) => (
              <TableRow key={index} selected={row.selected} >
                <TableRowColumn><img src={row.url} style={{width: 60, marginBottom: 10, marginTop: 10}}/></TableRowColumn>
                <TableRowColumn>{row.userName}</TableRowColumn>
                <TableRowColumn>Available</TableRowColumn>
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

  //Picks up all data from the table and saves it in this.state
  getServiceInfo(field, event){
    const receiverRequest = {};
    if (this.state.login === false && this.state.stepIndex === 2){
      receiverRequest[field] = event.target.value;
      console.log("You are not logged in,Fs but here is your job post", receiverRequest);

    } else{
      console.log(receiverRequest)
    this.setState(receiverRequest)
    console.log("Your data has been sent")
    }
  }

  getTime(blank, other, time){
    console.log(time);
    t = time;
    // this.setState({time: time})
  }

  getDate(blank, other, date){
    console.log(date);
    d= date;
    this.updatetimedate(t,d)
  }

  updatetimedate(t,d) {
    this.setState({time: t, date:d})
  }

  getReceiverInfo(field, event){
    const receiverInfo = {};

    receiverInfo[field] = event.target.value
     console.log(receiverInfo)
    this.setState(receiverInfo)
  }

//Once Logged in, this will post the new task to the Receiver table
 postInfo(){
  const {user}=this.props
  let newRequestid=[]
  if (this.state.stepIndex === 2){
    console.log("The new state for task pushInfo()", this.state)
    var newTask = this.state
    console.log("newtasks in postInfo", newTask)
    helpers.postTask(newTask, user.userName)
      .then(function(data){
        console.log("saving receivers now from jsx", data)
        console.log("this is the postTask user", user.userName)
        newRequestid= data.data.requests[data.data.requests.length -1]
        console.log("newRequestID",newRequestid)
        this.setState({requestId: newRequestid})
      }.bind(this))
  }
}

  handleDropdown(event, index, value) {
    console.log(value)
    this.setState({task: value});
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <h4>Job Details</h4>
            <DropDownMenu value={this.state.task} onChange={this.handleDropdown} style={{marginRight: 30}}>
              <MenuItem value="none" primaryText="Choose a category" />
              <MenuItem value="Mechanic" primaryText="Mechanic" />
              <MenuItem value="Handyperson" primaryText="Handyperson" />
              <MenuItem value="Office" primaryText="Office" />
              <MenuItem value="Delivery" primaryText="Delivery" />
              <MenuItem value="Volunteer" primaryText="Volunteer" />
              <MenuItem value={7} primaryText="" />
            </DropDownMenu>
            <br />
            <TextField
              id='text-field-controlled'
              floatingLabelText="City"
              className = "city"
              style={{marginRight: 20}}
              onChange={this.getReceiverInfo.bind(this, "city")}
            />
            <TextField
              id='text-field-controlled'
              floatingLabelText="State"
              className = "state"
              style={{marginRight: 20}}
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

