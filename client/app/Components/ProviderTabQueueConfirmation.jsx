import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

var ranNum

class ProviderTabQueueConfirmation extends React.Component {

  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      message: 'Confirming TODO ...',
      open: false,
    };
    this.timer = undefined;
  }

  componentWillUnMount() {
    clearTimeout(this.timer);
  }

  handleActionTouchTap() {
    confirm('todo ' + ranNum + ' will be cancel ..!' )

  }

  handleTouchTap() {
    const {todo} = this.props
    console.log('ProviderTabQueueConfirmation - handleTouchTap ', todo)
    console.log('ProviderTabQueueConfirmation - handleTouchTap ', todo.length)
    if(todo.length > 0) {
      this.setState({
        open: true,
        message: 'Todo ' + todo[todo.length-1].task + ' for ' + todo[todo.length-1].status.receiver
      });
    } else {
      this.setState({
        open: true,
        message: 'Please select task ...'
      });      
    }

    // this.timer = setTimeout(() => {
    //   this.setState({
    //     message: `Todo ${Math.round(Math.random() * 100)} added to your queue`,
    //   });
    // }, 1500);

  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
    console.log('closing')  // update todos here ...
  };

  render() {
    const {todo} = this.props

    return (
      <div className='text-center'>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          secondary={true}
          label="Add Task"
        />
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          onActionTouchTap = {this.handleActionTouchTap}
          action="undo"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default ProviderTabQueueConfirmation
