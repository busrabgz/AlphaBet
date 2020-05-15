import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Home extends Component {
  constructor() {
    super()
    }

  render() {
    return (<div>
        <NavBar />
        <h1>Home Page</h1>
    </div>);
  }
}

export default Home