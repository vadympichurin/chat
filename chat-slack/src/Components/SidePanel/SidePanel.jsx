import React, { Component } from "react";
import { Menu } from 'semantic-ui-react';
import UserPanel from "../UserPanel/UserPanel";
import Channels from '../Channels/Channels';
import DirectMessages from '../DirectMessages/DirectMessages';
import { connect } from 'react-redux';

class SidePanel extends Component {
    render() {
        let { colors } = this.props;
        return (
            <Menu size='large' inverted fixed='left' vertical style={{background: colors.primaryColor, fontSize: '1.2rem'}}>
            <UserPanel/>
            <Channels/>
            <DirectMessages/>
            </Menu>
        )
    }
}

const MSTP = state => ({
    colors: state.colors,
})

export default connect(MSTP)(SidePanel);