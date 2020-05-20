import React, { Component } from 'react'
import {UserContext, userInfo} from '../user-context';
import SingleBet from './SingleBet.jsx';
import { Typography, Box, TextField, Button, Paper } from '@material-ui/core';

const divStyle = {
  border: "solid 1px",
  borderRadius: 15,
  padding: "10px",
  float: "right",
  position: "fixed",
  bottom: "0",
  right: "0",
  height: "calc(100% - 100px)",
  width: "25em",
  overflow: "scroll",
  };

const boxStyle = {
  float: "center",
  position: "absolute",
  bottom: 10,
  right: 10,
}

class BetSlip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      betslip: this.props.slip,
      singleBets: [],
    };

  
    for ( var i = 0; i < this.state.betslip.length; i++) {
      var betinfo = {
        name: this.state.betslip[i].matchname,
        bet: this.state.betslip[i].bet,
        odd: this.state.betslip[i].odd
      }

      this.state.singleBets[i] = <SingleBet key={i} info= {betinfo}/>
    }
  }

  render() {
    return (
        <div style={divStyle}>
          {this.state.singleBets}
          <Box style={boxStyle}>
            <Paper elevation={4}>
              <div style={{position: "relative", float: "center"}}>
                  <Typography align="left" variant="subtitle1" color="initial">Minimum Bet Number</Typography>
                  <Typography align="left" variant="subtitle1" color="initial">Total Odd</Typography>
                  <Typography align="left" variant="subtitle1" color="initial">Expected Winning</Typography>
                </div>
            </Paper>
            <form>
              <TextField
                id="amount"
                label="Enter Amount"
                value={""}
                onChange={"no"}
                variant="outlined"
              />
              <Button style={{border: "solid 0.8px", height: 55}}>Place Bet</Button>
            </form>
          </Box>
        </div>
    );
  }
}   

export default BetSlip