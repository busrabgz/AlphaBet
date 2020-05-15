import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props)
    }

  render() {
    return (<div>
        <NavBar />
        <h1>Profile Page</h1>
    </div>);
  }
}

export default Profile