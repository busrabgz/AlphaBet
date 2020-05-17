import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {UserContext} from './user-context';

class Home extends Component {
  constructor(props) {
    super(props)
    }

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div>
            <NavBar userBalance={balance}/>
            <h1>Home Page</h1>
            <p>"WELCOME " {username}</p>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Home