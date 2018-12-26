import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from '../../redux/actions/setUserAction';

class DirectMessages extends Component {
  state = {
    users: [],
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref('.info/connected'),
    onlineRef: firebase.database().ref('onlineUsers'),
  }

  componentDidMount() {
    if (this.props.user) {
      this.addListener(this.props.user.uid);
    }
  }

  addListener = id => {
    let loadedUser = [];
    this.state.usersRef.on("child_added", snap => {
      if (id !== snap.key) {
        let user = snap.val();
        user.uid = snap.key;
        user.status = "offline";
        loadedUser.push(user);
        this.setState({
          users: loadedUser
        });
      }
    })

    this.state.connectedRef.on('value', snap => {
        if(snap.val()) {
            const ref = this.state.onlineRef.child(id);
            ref.set(true);
            ref.onDisconnect().remove(err => {
                if(err !== null) {
                    console.log(err);
                }
            })
        }
    })

    this.state.onlineRef.on('child_added', snap => {
        if(id !== snap.key) {
            this.setUserStatus(snap.key);
        }
    })

    this.state.onlineRef.on('child_removed', snap => {
        if(id !== snap.key) {
            this.setUserStatus(snap.key, false);
        }
    })
  };

  setUserStatus = (id, status = true) => {
      const updateUsers = this.state.users.map(el => {
          if(el.uid === id) {
              el.status = `${status ? "online" : "offline"}`
          }
      })
      this.setState({
          users: updateUsers,
      })
  }

  changeChannel = user => {
      const channelID = this.getChannelId(user.uid);
      const channelData = {
          id: channelID,
          name: user.name,
      }
      this.props.setCurrentChannel(channelData);
      this.props.setPrivateChannel(true);
  };

  getChannelId = userId => {
      const currentUserId = this.props.user.uid;
      return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
  };

  // ===============================================================================
  render() {
    const { users } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>({users.length})
          ({users.length})
        </Menu.Item>

        {users.length > 0 && users.map(el => (
          <Menu.Item
            key={el.uid}
            onClick={() => this.changeChannel(el)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon name="circle" color={el.status === "online" ? 'green' : 'red'}/> @ {el.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}

function MSTP(state) {
  return {
    user: state.user.currentUser
  };
}



export default connect(MSTP, {setCurrentChannel, setPrivateChannel})(DirectMessages);
