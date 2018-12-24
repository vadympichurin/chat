import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "../MessageHeader/MessageHeader";
import MessageForm from "../MessageForm/MessageForm";
import firebase from '../../firebase';

class Message extends Component {

state = {
    messagesRef: firebase.database().ref('messages'),
}
    
  render() {
      const { messagesRef } = this.state;
    return (
      <React.Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages" />
        </Segment>

        <MessageForm messagesRef = {messagesRef}/>
      </React.Fragment>
    );
  }
}

export default Message;
