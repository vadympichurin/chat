import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "../MessageHeader/MessageHeader";
import MessageForm from "../MessageForm/MessageForm";
import firebase from "../../firebase";
import { connect } from "react-redux";
import SingleMessage from '../SingleMessage/SingleMessage';

class Message extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    loading: true,
    countUser: '',
  };

  componentDidMount() {
    setTimeout(() => {
      const { currentChannel, currentUser } = this.props;
      if (currentChannel && currentUser) {
        this.addListeners(currentChannel.id);
      }
    }, 1000);
  }

  addListeners = channelID => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelID).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        loading: false
      })
      this.countUniqUser(loadedMessages)
    })
  }

  countUniqUser = messages => {
    const iniqueUsers = messages.reduce((acc, el) => {
      if(!acc.includes(el.user.name)) {
        acc.push(el.user.name)
      }
      return acc
    }, [])

    this.setState({
      countUser: `${iniqueUsers.length} users`
    })
  }

  render() {
    const { messagesRef, messages } = this.state;
    return (
      <React.Fragment>
        <MessageHeader countUser={this.state.countUser} />
        <Segment>
          <Comment.Group className="messages">
          {messages.length > 0 && messages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/> )}
          </Comment.Group>
        </Segment>

        <MessageForm messagesRef={messagesRef} />
      </React.Fragment>
    );
  }
}

function MSTP(state) {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel,
  };
}

export default connect(MSTP)(Message);
