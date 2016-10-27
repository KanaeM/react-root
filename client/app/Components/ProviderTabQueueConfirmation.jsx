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
    const {toBeDone} = this.props
    console.log('toBeDone: ', toBeDone)
    this.setState({
      open: true,
    });
    // console.log('toBeDone', toBeDone)
    // toBeDone.forEach((todo, index) => {
    //   console.log('todo', todo)
    //    this.timer = setTimeout((todo) => {
    //     // alert('todo' + todo)
    //     this.setState({
    //       message: 'This todo number: ' + index + ' was added' + todo
    //     })
    //   }, 1500)
     
    // })
    ranNum = Math.round(Math.random() * 100)
      this.setState({
        message: 'Todo ' + ranNum + ' was added to pending' ,
      });

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
  };

  render() {
    const {toBeDone} = this.props

    return (
      <div className='text-center'>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          secondary={true}
          label="Add TODOS"
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
