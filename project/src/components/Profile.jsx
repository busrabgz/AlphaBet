import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {UserContext} from './user-context';

class Profile extends Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div>
            <NavBar userBalance={balance}/>
            <h1>Profile Page of {username}</h1>
            <Button onClick={updateBalance}> Add balance </Button>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Profile