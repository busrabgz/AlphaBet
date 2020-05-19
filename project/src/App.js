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

    this.updateFriends = () => {
        this.setState( state => ({
            dummyFriend: 
             state.dummyFriend === false
             ?  true
             :  false
        }))
        
    }

    this.updateBalance = () => {
        this.setState( state => ({
            balance: state.balance + 1
        }));
    };

    this.updateLogInState = (newState, newType, newName,newId) => {
        this.setState( state => ({
            loggedIn: newState,
            type: newType,
            username: newName,
            userId: newId
        }));
        return true
    };

    this.state = {
        userId: userInfo.userId,
        username: userInfo.username,
        password: userInfo.password,
        balance: userInfo.balance,
        updateBalance: this.updateBalance,
        type: userInfo.type,
        loggedIn: userInfo.loggedIn,
        updateLogInState: this.updateLogInState,
        betslip: userInfo.betslip,
        dummyFriend: userInfo.dummyFriend,
        updateFriends: this.updateFriends
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