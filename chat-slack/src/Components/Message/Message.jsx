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
    filterMessages: [],
    searchTerm: '',
  };

  componentDidMount() {
    setTimeout(() => {
      const { currentChannel, currentUser } = this.props;
      if (currentChannel && currentUser) {
        this.addListeners(currentChannel.id);
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentChannel && this.props.currentChannel) {
      if(prevProps.currentChannel.name !== this.props.currentChannel.name) {
        this.addListeners(this.props.currentChannel.id)
      }
    }
  }

  addListeners = channelID => {
    let loadedMessages = [];
    let ref = this.state.messagesRef.child(channelID);


    ref.once("value").then((snapshot) => {
      // -------------------------------==-=-==-
      if(snapshot.exists()) {
        ref.on('child_added', snap => {
          loadedMessages.push(snap.val())
          this.setState({
            messages: loadedMessages,
            loading: false,
          })
          this.countUniqUser(loadedMessages)
        })
      } else {
        this.setState({
          messages: [],
          loading: false,
        })
        this.countUniqUser(this.state.messages)
      }
    })
  }

  //   this.state.messagesRef.child(channelID).on("child_added", snap => {
  //     loadedMessages.push(snap.val());
  //     this.setState({
  //       messages: loadedMessages,
  //       loading: false
  //     })
  //     this.countUniqUser(loadedMessages)
  //   })
  // }

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

  searchMessage = () => {
    let filteredMessages = this.state.messages.filter(el => {
      if(el.content) {
       return el.content.includes(this.state.searchTerm)
      }
    });
    this.setState({
      filterMessages: filteredMessages,
    })
    }
  

  addSearchMessage = async (e) => {
    await this.setState({
      searchTerm: e.target.value,
    })
    this.searchMessage()
  }

  




  // =========================================================================================================

  render() {
    const { messagesRef, messages, filterMessages } = this.state;
    return (
      <React.Fragment>
        <MessageHeader countUser={this.state.countUser} addSearchMessage={this.addSearchMessage}/>
        <Segment>
          <Comment.Group className="messages">

          {/*------------this checking------------------  */}

          {filterMessages.length > 0 && filterMessages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/>)}

          {filterMessages.length  === 0 && messages.length > 0 && messages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/> )}

        {/* ------- or this checking ---------------------------- */}

          {/* {
            filterMessages.length !== 0 ? filterMessages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/>) :
          messages.length > 0 ? messages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/> ) : null
        } */}

        {/* ------------------------------------------------------------------------- */}

          
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
