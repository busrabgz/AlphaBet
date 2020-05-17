import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../user-context';
import Paper from '@material-ui/core/Paper';

const divStyle = {
  height: "8em",
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
          <Paper elevation={3}>
            <p>{this.state.matchname}</p>
            <p>{this.state.bet}</p>
            <p>{this.state.odd}</p>
          </Paper>
        </div>
         )
  }
}

export default SingleBet