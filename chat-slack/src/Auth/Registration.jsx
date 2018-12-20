import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
    GridColumn
} from 'semantic-ui-react';


class Registration extends Component {
    render() {
        return(
           <Grid textAlign='center' verticalAlign='middle' className='app'>
           <GridColumn style={{
               maxWidth: 450
           }}>
           <Header as='h2' icon color="orange" textAlign='center'>
           <Icon name='comment alternate' color='orange'/>
           Register form for Chat
           </Header>
           <Form size='large'>
           <Segment stacked>

           <Form.Input
           fluid
           name='username'
           icon='user'
           iconPosition='left'
           placeholder='Username'
           type='text'/>

           <Form.Input
           fluid
           name='email'
           icon='mail'
           iconPosition='left'
           placeholder='Email'
           type='email'/>

           <Form.Input
           fluid
           name='password'
           icon='lock'
           iconPosition='left'
           placeholder='Password'
           type='password'/>

           <Form.Input
           fluid
           name='passwordConfirm'
           icon='repeat'
           iconPosition='left'
           placeholder='Password Confirm'
           type='password'/>

           <Button color='orange' fluid size='large'>
           Submit
           </Button>

           </Segment>
           </Form>
           <Message>
               Already a user?
               <NavLink to='/login'>Login</NavLink>
           </Message>
           
           </GridColumn>
           </Grid>
        )
    }
}

export default Registration;