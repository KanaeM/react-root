import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

class ProviderTabDetailConfirmation extends React.Component {

  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      message: 'Please confirm ...',
      open: false,
    };
    this.timer = undefined;
  }

  componentWillUnMount() {
    clearTimeout(this.timer);
  }

  handleActionTouchTap() {
    alert('I was clicked')

  }

  handleTouchTap() {
    const {toBeDone} = this.props
    this.setState({
      open: true,
    });
    console.log('toBeDone', toBeDone)
    toBeDone.forEach((todo, index) => {
      console.log('todo', todo)
       this.timer = setTimeout((todo) => {
        // alert('todo' + todo)
        this.setState({
          message: 'This todo number: ' + index + ' was added' + todo
        })
      }, 1500)
     
    })


    // this.timer = setTimeout(() => {
    //   this.setState({
    //     message: `this.props.toBeDone[]` //`Event ${Math.round(Math.random() * 100)} added to your calendar`,
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
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
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

export default ProviderTabDetailConfirmation
