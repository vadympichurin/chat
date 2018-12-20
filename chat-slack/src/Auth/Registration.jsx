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
import firebase from '../firebase';


class Registration extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    }

    handlerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser);
        })
        .catch(err => console.log(err))
        // e.target.value = ""

    }





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
           <Form size='large' onSubmit={this.handleSubmit}>
           <Segment stacked>

           <Form.Input
           fluid
           name='username'
           icon='user'
           iconPosition='left'
           placeholder='Username'
           type='text'
           onChange={this.handlerChange}
           value={this.state.username}
           />

           <Form.Input
           fluid
           name='email'
           icon='mail'
           iconPosition='left'
           placeholder='Email'
           type='email'
           onChange={this.handlerChange}
           value={this.state.email}
           />

           <Form.Input
           fluid
           name='password'
           icon='lock'
           iconPosition='left'
           placeholder='Password'
           type='password'
           onChange={this.handlerChange}
           value={this.state.password}
           />

           <Form.Input
           fluid
           name='passwordConfirm'
           icon='repeat'
           iconPosition='left'
           placeholder='Password Confirm'
           type='password'
           onChange={this.handlerChange}
           value={this.state.passwordConfirm}
           />

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