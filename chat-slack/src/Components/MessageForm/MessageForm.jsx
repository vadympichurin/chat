import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from '../../firebase';
import { connect } from 'react-redux';
import FileModals from "../FileModals/FileModals";
import uuidv4 from 'uuid/v4';

class MessageForm extends Component {

    state = {
        message: '',
        loading: false,
        errors: '',
        modalState: false,
        uploadTask: null,
        storageRef: firebase.storage().ref(),
    }

    togleModal = () => {
        this.setState(prev => ({
          modalState: !prev.modalState
        }));
      };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    createMessage = (url = null) => {
        const message = {
            // content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }
        if(url !== null) {
            message['image'] = url
        } else {
            message['content'] = this.state.message;
        }
        return message;
    }

    sendMessage = () => {
        const { messagesRef, currentChannel } = this.props; 
        const { message } = this.state;

        if(message) {
            this.setState({loading: true,})
            messagesRef
            .child(currentChannel.id)
            .push()
            .set(this.createMessage())
            .then(() => {
                this.setState({loading: false, message: ''})
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    errors: this.state.erroes.concat(err)
                })
            })
        }
    }

    uploadFile = (file, metadata) => {
        const pathToUpload = this.props.currentChannel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/image${uuidv4()}.jpg`;
        this.setState({
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        },
        () => {
            this.state.uploadTask.on(
                "state_changed",
                () => {
                    this.state.uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            this.sendFileMessage(downloadURL, ref, pathToUpload);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            )
        })
    }

    sendFileMessage = (url, ref, path) => {
        ref.child(path)
        .push()
        .set(this.createMessage(url))
        .catch(err => {
            console.log(err);
        })
    }


    // ===================================================================================
  render() {
    return (
      <Segment className="message_form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7rem" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="write your message"
          onChange={this.handleChange}
          value={this.state.message}
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add reply"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
          />
          <Button
            color="teal"
            content="Upload media"
            labelPosition="right"
            icon="cloud upload"
            onClick={this.togleModal}
          />
        </Button.Group>
        <FileModals togleModal={this.togleModal} modalState={this.state.modalState} uploadFile={this.uploadFile}/>
      </Segment>
    );
  }
}

function MSTP(state) {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel,
    }
}

export default connect(MSTP)(MessageForm);
