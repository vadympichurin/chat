import React, { Component } from "react";
import { Sidebar, Menu, Divider, Button, Modal, Icon, Label, Segment } from "semantic-ui-react";
import { connect } from 'react-redux';
import firebase from "../../firebase";
import { TwitterPicker } from 'react-color';

class ColorPanel extends Component {

  state = {
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref("users"),
  }

  togleModal = () => {
    this.setState(prev => ({
      modal: !prev.modal
    }));
  };

  handleChangePrimaryColor = color => {
    this.setState({
      primary: color.hex,
    })
  }

  handleChangeSecondaryColor = color => {
    this.setState({
      secondary: color.hex,
    })
  }

  handleSaveColor = () => {
    if(this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary)
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
    .child(`${this.props.user.uid}/colors`)
    .push()
    .update({
      primary,
      secondary,
    })
    .then(() => {
      console.log("Colors added");
      this.togleModal();
    })
    .catch(err => console.log(err))
  };


  // ===========================================================
  render() {
    let {primary, secondary, modal} = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        visible
        vertical
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.togleModal}/>

        <Modal basic open={modal} onClose={this.togleModal}>
        <Modal.Header>Choose App Color</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content="Primary color" />
            <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>
          </Segment>

          <Segment>
            <Label content="Secondary color" />
            <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>
          </Segment>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={this.handleSaveColor}>
          <Icon name="checkmark" /> Save Colors 
          </Button>
          <Button color="red" inverted onClick={this.togleModal}>
          <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>

        </Modal>
      </Sidebar>
    );
  }
}

const MSTP = state => ({
  user: state.user.currentUser,
})

export default connect(MSTP)(ColorPanel);
