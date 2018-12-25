import React, { Component } from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";
import { connect } from 'react-redux';

class MessageHeader extends Component {
  render() {
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>

         <span> {this.props.channelName} <Icon name="star outline" color="black" /></span>

          <Header.Subheader>{this.props.countUser}</Header.Subheader>
        </Header>

        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            nema="searchTerm"
            placeholder="Searh..."
          />
        </Header>
      </Segment>
    );
  }
}

function MSTP(state) {
  return {
    channelName: state.channel ? state.channel.name : 'Channel',
  }
}

export default connect(MSTP)(MessageHeader);
