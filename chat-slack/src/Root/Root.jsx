import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import firebase from "../firebase";

class Root extends Component {
componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log(user);
            this.props.history.push('/');
        }
    })
}



    render () {
        return (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
            </Switch>
        )
    }
}

export default withRouter(Root);