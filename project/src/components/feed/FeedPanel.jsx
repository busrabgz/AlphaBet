import React, { Component } from 'react'
import {UserContext} from '../user-context';
import SingleFeed from './SingleFeed.jsx'

const divStyle = {
  float: "left",
  width: "calc(95% - 25em)",
  marginLeft: "15px",
  };

class FeedPanel extends Component {



  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div style={divStyle}>
            <h1>Feeds will be shown here</h1>
            <SingleFeed />
            <SingleFeed />
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default FeedPanel