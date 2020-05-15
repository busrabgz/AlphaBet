import React, { Component } from 'react'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props)
    }

  render() {
    return (<div>
          <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/">
                <Home />
              </Route>
          </Switch>
    </div>);
  }
}

export default Landing