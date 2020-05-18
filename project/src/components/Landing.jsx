import React from 'react'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'
import SignIn from './SignIn.jsx'
import {
  BrowserRouter as
  Switch,
  Route
} from "react-router-dom";
import {UserContext} from './user-context';

class Landing extends React.Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, updateLogInState, type, loggedIn, userId} ) => (
        <div>
          <Switch>
              <Route path="/profile">
                <Profile id={userId}/>
              </Route>
              <Route path="/register">
                <Register id={userId}/>
              </Route>
              <Route path="/signin">
                <SignIn id={userId} isLogged={loggedIn} name={username} updateLogIn={updateLogInState} userType={type} balanceFunc={updateBalance} balance={balance} />
              </Route>
              <Route exact path="/">
                <Home id={userId}/>
              </Route>
          </Switch>
        </div>
        )}
    </UserContext.Consumer>);
  }
}
Landing.contextType = UserContext;

export default Landing