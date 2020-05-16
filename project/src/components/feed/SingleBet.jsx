import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../user-context';

const divStyle = {
  height: "10em",
  overflowX: "scroll",
  overflowY: "hidden",
  };

class SingleBet extends Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div style={divStyle}>
            <h1>Bets will be shown here</h1>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default SingleBet