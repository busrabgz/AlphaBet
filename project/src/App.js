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
    
    this.updateUserInfo = () => {
        this.setState( state => ({
            changeUserInfo: 
             state.changeUserInfo === false
             ?  true
             :  false
        }))
    }

    this.updateBalance = (newBalance) => {
            this.setState( state => ({
                balance: state.balance + newBalance
            }))
    this.updateFilterInfo = (filter) => {
        console.log("Inside filter info")
        this.setState( state => ({
            filterInfo: filter
        }))
    }
    };

    this.updateAlphaCoins = (newCoin) => {
        this.setState( state => ({
            alphaCoins: state.alphaCoins + newCoin
        }))
    }

    this.updateLogInState = (newState, newType, newName,newId, newBalance, newCoins) => {
        this.setState( state => ({
            loggedIn: newState,
            type: newType,
            username: newName,
            userId: newId,
            balance: newBalance,
            alphaCoins: newCoins
        }));
        return true
    };

    this.updateBetsInfo = (bets) => {
        this.setState( state => ({
            betsInfo: 
             state.betsInfo === false
             ?  true
             :  false
        }))
    }

    this.state = {
        userId: userInfo.userId,
        username: userInfo.username,
        password: userInfo.password,
        balance: userInfo.balance,
        updateBalance: this.updateBalance,
        type: userInfo.type,
        loggedIn: userInfo.loggedIn,
        updateLogInState: this.updateLogInState,
        dummyFriend: userInfo.dummyFriend,
        updateFriends: this.updateFriends,
        changeUserInfo: userInfo.changeUserInfo,
        updateUserInfo: this.updateUserInfo,
        alphaCoins: userInfo.alphaCoins,
        updateAlphaCoins: this.updateAlphaCoins
        filterInfo: userInfo.filterInfo,
        updateFilterInfo: this.updateFilterInfo,
        betsInfo: userInfo.betsInfo,
        updateBetsInfo: this.updateBetsInfo
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