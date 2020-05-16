import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class SignIn extends Component {
  constructor() {
    super()
    }

  render() {
    return (<div>
        <NavBar />
        <h1>Sign In Page</h1>
    </div>);
  }
}

export default SignIn