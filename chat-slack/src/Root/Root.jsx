import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, clearUser } from '../redux/actions/setUserAction';
import App from "../App";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import firebase from "../firebase";
import Spiner from '../spiner/Spiner';

class Root extends Component {
componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log(user);
            this.props.setUser(user);
            this.props.history.push('/');
        } else {
            this.props.history.push('/login');
            this.props.clearUser();
        }
    })
}



    render () {
        return this.props.isLoading ? <Spiner/> : (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
            </Switch>
         )
    }
}

function MSTP (state) {
    return {
        isLoading: state.user.isLoading,
    }
}

function MDTP (dispatch) {
    return {
        setUser: function(user){
            dispatch(setUser(user))
        },
        clearUser: function(){
            dispatch(clearUser())
        },

    }
}

export default withRouter(connect(MSTP,MDTP)(Root));