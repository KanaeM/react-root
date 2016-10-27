import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {cyan100, blue200, blueGrey200, lightGreenA700} from 'material-ui/styles/colors';
// import RaisedButton from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';
import CheckMark from 'material-ui/svg-icons/action/done';
import helpers from '../helpers';


const styles = {
  propContainer: {
    width: 185,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};
var rowNum

class ProviderTabCompleted extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleAvailable = this.handleAvailable.bind(this);
    this.modalRowDetails = this.modalRowDetails.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      // multiSelectable: false,
      // enableSelectAll: false,
      // deselectOnClickaway: true,
      showCheckboxes: false,
      openModal: false,
      height: '450px',
      todos: []
    };
  }

  handleAvailable(event) {
    this.handleModalClose()
    if(event.target.checked){
      console.log('ProviderTabQueue - handleAvailable : ', event.target.id)
    }
    var valid = this.state.todos.filter(function(todo) { 
      return todo._id === event.target.id
    })[0]
    console.log('valid',valid)
    if(valid ) {
      this.state.todos = this.state.todos.filter(function(todo) {
        return todo._id !== event.target.id ;
      });
      // this.state.todos.splice(this.state.todos.indexOf(event.target.id), 1)
    } else {
      var temp = this.props.user.todos[rowNum]
      temp.status.available = true
      this.state.todos.push(temp)
      // this.state.todos.push(this.props.user.todos[rowNum])
    }   
    console.log(this.state.todos)
    // alert('You have select this task: ' + this.props.user.todos[rowNum]._id)
  }

  handleRowSelection(row) {
    // alert('i wass selected:' + row)
    this.setState({openModal: true});
    rowNum = row;

  }

  handleModalClose(){
    this.setState({openModal: false});
  };

  modalRowDetails(){
    const {todos} = this.props.user

    if (this.state.openModal === true){
      const actions = [
        <RaisedButton
          label="OK"
          primary={true}
          disabled={false}
          onTouchTap={this.handleModalClose}
        />
      ];
      return(
        <div>
          <Dialog
            title={'Task Information for ' + todos[rowNum].status.receiver}
            actions={actions}
            modal={true}
            open={this.state.openModal}
          >
            <div>
              <Card>
                <CardHeader
                  // title={'Category' + todos[rowNum].task}
                  // subtitle=
                  actAsExpander={true}
                  showExpandableButton={true}
                >
                  <span>{'Category: ' + todos[rowNum].task}</span>
                  <span style={{'paddingLeft':'50px'}}>{'City: ' + todos[rowNum].city}</span>
                  <span style={{'paddingLeft':'50px'}}>{'Date: ' + todos[rowNum].date.split('T')[0]}</span>
                  
                </CardHeader>
                <CardText expandable={true}>
                  <h4>Details</h4>
                  <p>{'Description: ' + todos[rowNum].description}</p>
                  <span>{'Date' + todos[rowNum].date}</span>
                  <br/>
                  <span>{'Status: '}</span>
                  <CheckMark style={{size: 50}} color={lightGreenA700} />
                </CardText>
              </Card>             
            </div>
          </Dialog>
        </div>
      );
    }
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event) {
    this.setState({height: event.target.value});
  };

  componentDidUpdate() {
    console.log('ProviderTabQueue - componentDidMount');
  }


  render() {
    const { login, user } = this.props;

    // IS showing all todos for the user neeed to separate them 

    return (
      <div>
        {this.modalRowDetails()}
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection = {this.handleRowSelection}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Task">Number</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Task">Category</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">City</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Description</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Complete</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Receiver</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {user.todos.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.task}</TableRowColumn>
                <TableRowColumn>{row.city}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
                <TableRowColumn>{row.date.split('T')[0]}</TableRowColumn>
                <TableRowColumn>
                  <CheckMark style={{size: 50}} color={lightGreenA700} />
                </TableRowColumn>
                <TableRowColumn>{row.status.receiver}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>

      </div>
    );
  }
}

export default ProviderTabCompleted;