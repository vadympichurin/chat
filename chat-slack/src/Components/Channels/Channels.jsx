import React, { Component } from "react";
import {Menu, Icon, Modal, Header, Button, Input, Form } from "semantic-ui-react";
import firebase from '../../firebase';
import { connect } from 'react-redux';

class Channels extends Component {
  state = {
    channels: [],
    channelName: "",
    channelDescription: "",
    modalState: false,
    channelsRef: firebase.database().ref('channels'),
  };

  togleModal = () => {
    this.setState(prev => ({
      modalState: !prev.modalState
    }));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
    })
  };

  isFormFilled = ({channelName, channelDescription}) => channelName && channelDescription;

  addChannel = (e) => {
    e.preventDefault();
    if(this.isFormFilled(this.state)){
    this.addChannelsToDatabase();
    }
  }

  addChannelsToDatabase = () => {
    const {channelsRef, channelName, channelDescription} = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDescription,
      createdBy: {
        name: this.props.user.displayName,
        avatar: this.props.user.photoURL,
      }
    }
    console.log(newChannel)
    channelsRef.child(key)
    .update(newChannel)
    .then(() => {
      this.setState({
        channelName: '', channelDescription: '',
      })
      this.togleModal();
      console.log('channel added');
    })
    .catch(err => console.log(err))
  }

  



  render() {
    const { channels, modalState, channelName, channelDescription } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2rem" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length})<Icon onClick={this.togleModal} name="add" />
          </Menu.Item>
        </Menu.Menu>

        <Modal open={modalState} onClose={this.togleModal} closeIcon>
          <Header icon="wechat" content="Add channel" />
          <Modal.Content>

            <Form onSubmit={this.addChannel}>
              <Form.Field>
                <Input
                  fluid
                  name="channelName"
                  placeholder="Channel name"
                  type="text"
                  value={channelName}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  name="channelDescription"
                  placeholder="Channel description"
                  type="text"
                  value={channelDescription}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.togleModal}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" onClick={this.addChannel}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

function MSTP (state) {
  return {
    user: state.user.currentUser,
  }
}

export default connect(MSTP)(Channels);
