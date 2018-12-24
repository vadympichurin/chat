import React, { Component } from "react";
import {
  Menu,
  Icon,
  Modal,
  Header,
  Button,
  Input,
  Form
} from "semantic-ui-react";

class Channels extends Component {
  state = {
    channels: [],
    channelName: "",
    channelDescription: "",
    modalState: false
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

  addChannel = () => {
    if(this.isFormFilled(this.state)){
    this.setState(prev => ({
      channels: [...prev.channels, {name: this.state.channelName, description: this.state.channelDescription}],
      channelName: '',
      channelDescription: ''
    }))}
    this.togleModal();
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

            <Form>
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

export default Channels;
