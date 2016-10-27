import React, {Component} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import helpers from '../receiverhelpers';

class AvailableUsersTable extends Component {

  constructor(props) {
    super(props);
    this.state={
      providers:[]
    }
  }

  handleToggle(event, toggled){
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event){
    this.setState({height: event.target.value});
  };

  componentDidUpdate(prevProp, prevState){
    if(prevState.providers !== this.state.providers){
      console.log("the providers array has CHANGED")
    }
  }

  componentDidMount(){
    helpers.getProvider()
      .then(function(providers){
        console.log("providers gottern", providers.data)
        // for (var i=0; i<providers.data.length; i++){
          // console.log
        //   if(providers[i].services.anytime === false){
            this.setState({providers:providers.data});
        //   }
        // }
        
        
        console.log("available user table",this.state.providers)
      }.bind(this))
  }

  render() {
    let {providers} = this.state;
    console.log("these are the providers available", this.state.providers)
    return (
      <div>
        <Table
            fixedHeader={true}
            selectable={true}
            // onCellClick={this.handleOpen}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}} >
                  <h2 style={{marginTop:30}}>Available Users</h2>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn tooltip="Profile Pic"></TableHeaderColumn>
                <TableHeaderColumn tooltip="UserName">City</TableHeaderColumn>
                <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={true}
              showRowHover={true}
              stripedRows={true}
            >
              {providers.map( (row, index) => (
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

export default AvailableUsersTable;