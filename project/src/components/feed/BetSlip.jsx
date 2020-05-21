import React, { Component } from 'react'
import {UserContext, userInfo} from '../user-context';
import SingleBet from './SingleBet.jsx';
import { Typography, Box, TextField, Button, Paper } from '@material-ui/core';
import axios from 'axios'
const URL = "http://localhost:5000/";

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
      singleBets: [],
      text: "",
      mbn: 0
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleButton() {
    axios.post(URL,
      {
        request_type: "play_betslip",
        username: this.props.username,
        played_amount: this.state.text
       },
       )
      .then( res => {
        if (res.status == "not_enough_credits") {
          alert("Not enough credits.")
        }
        else if ( res.status == "mbn_not_satisfied") {
          alert("MBN not satisfied!")
        }
        else {
          console.log("success")
        }

      })
       .catch(error => {
          console.log("bet error", error);
          });
  }

  componentDidMount() {
    axios.post(URL,
      {
        request_type: "display_user_bet_slip",
        person_id: this.props.id,
       },
       )
      .then( res => {
        console.log("User's bets are:", res.data)
        /*
        var max = 0;
        for (var i = 0; i < res.data.bets.length; i++) {
          if (max < res.data.bets)
        }
        */
        this.setState({
          singleBets: res.data.bets
        })
          })
       .catch(error => {
          console.log("bet error", error);
          });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.betsInfo != this.props.betsInfo) {
      axios.post(URL,
        {
          request_type: "display_user_bet_slip",
          person_id: this.props.id,
         },
         )
        .then( res => {
          console.log("User's bets are:", res.data)
          this.setState({
            singleBets: res.data.bets
          })
            })
         .catch(error => {
            console.log("bet error", error);
            });
    }
   
  }

  render() {
    return (
        <div style={divStyle}>
          {this.state.singleBets.map((singleBet) => {
            let matchName = singleBet.away_side + "-" + singleBet.home_side
            return(
              <SingleBet matchname={matchName} type={singleBet.bet_type} odd={singleBet.odd}/>
              ) 
          })}
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
                value={this.state.text}
                onChange={this.handleChange}
                variant="outlined"
              />
              <Button onClick={this.handleButton} style={{border: "solid 0.8px", height: 55}}>Place Bet</Button>
            </form>
          </Box>
        </div>
    );
  }
}   

export default BetSlip