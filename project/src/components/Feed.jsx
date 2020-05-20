import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import FeedPanel from './feed/FeedPanel.jsx'
import BetSlip from './feed/BetSlip.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {UserContext} from './user-context';

const divStyle = {
  height: "calc(90% - 25em)",
  };

class Feed extends Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, betslip, loggedIn, alphaCoins} ) => (
        <div>
            <NavBar userBalance={balance} id = {this.props.id} isLogged={loggedIn} alphaCoins={alphaCoins}/>
            <div style={divStyle}>
                <BetSlip slip={betslip} />
                <FeedPanel username={username}/>
            </div>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Feed