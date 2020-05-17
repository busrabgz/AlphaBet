import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../user-context';

const divStyle = {
  height: "10em",
  overflowX: "scroll",
  overflowY: "hidden",
  };

class SingleBet extends Component {

  constructor(props) {
    super(props)
    this.state = {
      matchname: props.info.name,
      bet: props.info.bet,
      odd: props.info.odd
    }
  }

  render() {
    return (
        <div style={divStyle}>
            <p>{this.state.matchname}</p>
            <p>{this.state.bet}</p>
            <h3>{this.state.odd}</h3>
        </div>
         )
  }
}

export default SingleBet