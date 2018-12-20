import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

class Root extends Component {
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

export default Root;