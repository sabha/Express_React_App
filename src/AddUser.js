import React from 'react';
import Dialog from 'material-ui/Dialog';
import UserForm from './UserForm';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <RaisedButton label="Add New User" onClick={this.handleOpen} />
        <Dialog
          title=" New User"
          modal={false}
          autoScrollBodyContent={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <UserForm handleClose={() => this.handleClose()} fetchUser={()=>this.props.fetchUser()} />
        </Dialog>
      </div>
    );
  }
}
