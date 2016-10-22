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
import helpers from '../helpers';

class UserInfoPage extends Component {

 constructor(props){
 	super(props);

 	this.handleNext = this.handleNext.bind(this);
 	this.handlePrev = this.handlePrev.bind(this);
  this.pushInfo = this.pushInfo.bind(this);

 	this.state ={
    loading: false,
    finished: false,
    stepIndex: 0,
    // firstName: '',
    // lastName: '',
    // company: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    // phone: '',
    // email: '',
    // password: '',
      task: '',
      city: '',
      time: '',
      date: '',
      description:'',
      login: false,
      modalOpen: false,
      modalLoading: false
  };
 }

  
  dummyAsync(cb){
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

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

  getServiceInfo(field, event){
    const receiverRequest = {};
    if (this.state.login === false){
      receiverRequest[field] = event.target.value;
      console.log("You are not logged in, but here is your job post", receiverRequest);

    } else{
    this.setState(receiverRequest)
    console.log("Your data has been sent")
    }
}


  getReceiverInfo(field, event){
    const receiverInfo = {};

    receiverInfo[field] = event.target.value
     console.log(receiverInfo)
    this.setState(receiverInfo)
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
              style={{marginRight: 20}}
              onChange={this.getReceiverInfo.bind(this, "task")}
            />
 						<br />
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
              onChange={this.getServiceInfo.bind(this, "time")}
            />
            <DatePicker hintText="Dates for Assignment" 
              onChange={this.getServiceInfo.bind(this, "date")}
            />
            <br />
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Press Submit to post your job</h3>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

pushInfo(){
  if (this.state.stepIndex === 2){
    console.log(this.state)
    var newReceiver = this.state
    helpers.postReceiver(newReceiver)
      .then(function(data){
        console.log("saving receivers now", data)
        this.state
      }.bind (this))
  }
}

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <h3 style={{marginBottom: 20}}>Thank you for filling out the job post! We will contact you once you are connected with a candidate.</h3>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
                
              }}
            >
              Click here
            </a> to start another job post
          </p>
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
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
            onClick={this.pushInfo}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
    );
  }
}
export default UserInfoPage;

