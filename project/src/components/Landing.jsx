import React from 'react'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'
import SignIn from './SignIn.jsx'
import Editor from './Editor.jsx'
import {
  BrowserRouter as
  Switch,
  Route
} from "react-router-dom";
import {UserContext} from './user-context';

class Landing extends React.Component {

  render() {
    return (
        <div>
          <Switch>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/editors">
                <Editor/>
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/">
                <Home/>
              </Route>
          </Switch>
        </div>
    );
  }
}
Landing.contextType = UserContext;

export default Landing