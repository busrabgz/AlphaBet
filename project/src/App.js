import React, { useState, useEffect } from 'react';
import Landing from './components/Landing.jsx'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {UserContext, userInfo} from './components/user-context.js';

class App extends React.Component {
    constructor(props){
    super(props)

    this.updateBalance = (amount) => {
        this.setState( state => ({
            balance: state.balance + 1
        }));
    };

    this.updateLoginState = (newState, newType) => {
        this.setState( state => ({
            loggedIn: newState,
            type: type
        }));
    };

    this.state = {
        username: userInfo.username,
        password: userInfo.password,
        balance: userInfo.balance,
        updateBalance: this.updateBalance,
        type: userInfo.type,
        loggedIn: userInfo.loggedIn,
        updateLogInState: this.updateLogInState 
        };

    }

  render(){
      return (
        <div className="App">
            <Router>
                <UserContext.Provider value={this.state}>
                    <Landing />
                </UserContext.Provider>
            </Router>
        </div>
      );
  }
}

export default App;