import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

class UserPanel extends Component {

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span><Icon name='sign-in'/> Signed in as <strong>User</strong></span>,
            disabled: true,
        },
        {
            key: 'avatar',
            text: <span><Icon name='picture'/> Change Avatar</span>
        },
        {
            key: 'out',
            text: <span onClick={this.signOut}><Icon name='sign-out' />Sign Out</span>
        }
    ]

    signOut = () => {
        firebase.auth().signOut().then(() => {console.log('Signed Out')})
    }


    render(){
        return(
            <Grid style={{background: "4c3c4c"}}>
            <Grid.Column>
                <Grid.Row style={{padding: '1.2rem', margin:'0'}}>
                <Header inverted floated='left' as='h2'>
                <Icon name='cloud'/>
                <Header.Content>Slack clone</Header.Content>
                </Header>
                </Grid.Row>
                <Header style={{padding: '0.25rem'}} as='h4' inverted>
                <Dropdown trigger={
                    <span><Image src={this.props.currentUser.photoURL} spaced='right' avatar/>{this.props.currentUser.displayName}</span>
                } options={this.dropdownOptions()}/>
                </Header>
            </Grid.Column>
            </Grid>
        )
    }
}

function MSTP (state){
    return {
        currentUser: state.user.currentUser,
    }
}

export default connect(MSTP)(UserPanel);