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
} from "semantic-ui-react";
import firebase from "../firebase";
import md5 from 'md5';

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
      };


      handlerChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      isFormEmpty = ({email, password}) => {
          return email && password
      }
    
        isFormValid = () => {
            let errors = []
            let error;
            if(!this.isFormEmpty(this.state)){
                error = {
                    message: 'Fill in all fields'
                };
                this.setState({
                    errors: errors.concat(error)
                })
                return false;
            } else {
                return true
            }
        }
      
      handleSubmit = e => {
        e.preventDefault();
        if(this.isFormValid(this.state)) {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                })
            })
      };
    }
    
    handleInput = (errors, inputName) => {
        return errors.some(el => el.message.toLowerCase().includes(inputName)) ? "error" : ''
    }
    



    render(){
        let {errors, username, email, password, passwordConfirm} = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn
          style={{
            maxWidth: 450
          }}
        >
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="user secret" color="green" />
            Register form for Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                onChange={this.handlerChange}
                value={this.state.email}
                className={this.handleInput(errors, 'email')}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handlerChange}
                value={this.state.password}
                className={this.handleInput(errors, 'password')}
              />

              <Button color="green" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
              <Message error>
              <h3>Error</h3>
              {errors.map(el => <p key={el.message}>{el.message}</p>)}
              </Message>
          )}
          <Message>
            Already a user?
            <NavLink to="/registration">Registration</NavLink>
          </Message>
        </GridColumn>
      </Grid>
    );
    }
}

export default Login;