import React, {Component} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

class AvailableUsersTable extends Component {

  constructor(props) {
    super(props);
  }

  handleToggle(event, toggled){
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event){
    this.setState({height: event.target.value});
  };

  render() {
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
                <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}} >
                  <h2 style={{marginTop:30}}>Available Users</h2>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Username">User Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Username">User Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Assigned Date and Time">City</TableHeaderColumn>
                <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={true}
              showRowHover={true}
              stripedRows={true}
            >
              {tableData.map( (row, index) => (
                <TableRow key={index} selected={row.selected} >
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.status}</TableRowColumn>
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