import React, { Component } from 'react'
import {UserContext} from '../user-context';
import SingleBet from './SingleBet.jsx';

const divStyle = {
  border: "thick solid #0000FF",
  float: "right",
  position: "fixed",
  bottom: "0",
  right: "0",
  height: "calc(100% - 100px)",
  width: "25em",
  overflow: "scroll",
  };

class BetSlip extends Component {



  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div style={divStyle}>
            <SingleBet />
            <SingleBet />
            <SingleBet />
            <SingleBet />
            <SingleBet />
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default BetSlip