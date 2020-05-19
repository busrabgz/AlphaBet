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
    { ( {username, balance, updateBalance, loggedIn} ) => (
        <div>
            <NavBar userBalance={balance} userSuccess={loggedIn} type={this.props.type}/>
            <h1>Home Page</h1>
            <p>"WELCOME " {this.props.id}</p>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Home