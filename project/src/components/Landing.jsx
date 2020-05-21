import React from 'react'
import Home from './Home.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'
import SignIn from './SignIn.jsx'
import Feed from './Feed.jsx'
import Market from './Market.jsx'
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
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, updateLogInState, type, loggedIn, userId, updateFilterInfo, filterInfo, updateBetsInfo, betsInfo, dummyFriend, updateFriends, alphaCoins} ) => (
        <div>
          <Switch>
              <Route path="/profile">
                <Profile id={userId} type={type}/>
              </Route>
              <Route path="/editors">
                <Editor id = {userId} type={type}/>
              </Route>
              <Route path="/register">
                <Register id={userId} type={type} userSuccess={loggedIn} balance={balance} alphaCoins = {alphaCoins}/>
              </Route>
              <Route path="/feed">
                <Feed id={userId} id={userId} balance={balance} userSuccess={loggedIn} type={type} dummyFriend={dummyFriend} updateFriends = {updateFriends}/>
              </Route>
              <Route path="/signin">
                <SignIn id={userId} isLogged={loggedIn} name={username} updateLogIn={updateLogInState} type={type} balanceFunc={updateBalance} balance={balance} alphaCoins = {alphaCoins}/>
              </Route>
              <Route path="/market">
                <Market id={userId} type={type}/>
              </Route>
              <Route exact path="/">
                <Home id={userId} type={type} updateFilterInfo={updateFilterInfo} filterInfo={filterInfo} username={username} updateBetsInfo={updateBetsInfo} betsInfo={betsInfo}/>
              </Route>
          </Switch>
        </div>
        )}
    </UserContext.Consumer>);
  }
}
Landing.contextType = UserContext;

export default Landing