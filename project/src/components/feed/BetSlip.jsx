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
      mbn: 0,
      totalOdd: 1
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
    var no = parseInt(this.state.text)
    axios.post(URL,
      {
        request_type: "play_betslip",
        username: this.props.username,
        played_amount: no
       },
       )
      .then( res => {
        if (res.data.status == "not_enough_credits") {
          alert("Not enough credits.")
        }
        else if ( res.data.status == "mbn_not_satisfied") {
          alert("MBN not satisfied!")
        }
        else if (res.data.status == "success") {
          alert("Bet slip is placed! Check profile page.")
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
        var max = 0;
        var total = 1
        for (var i = 0; i < res.data.bets.length; i++) {
          if (max < res.data.bets[i].mbn) {
            max = res.data.bets[i].mbn
          }
          total = total * res.data.bets[i].odd
        }


        this.setState({
          singleBets: res.data.bets,
          mbn:max,
          totalOdd: total
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
          var max = 0;
          for (var i = 0; i < res.data.bets.length; i++) {
            if (max < res.data.bets[i].mbn) {
              max = res.data.bets[i].mbn
            }
          }
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
    let expected = this.state.text * this.state.totalOdd
    return (
        <div style={divStyle}>
          {this.state.singleBets.map((singleBet) => {
            let matchName = singleBet.away_side + "-" + singleBet.home_side
            return(
              <SingleBet matchname={matchName} type={singleBet.bet_type} odd={singleBet.odd} mbn={singleBet.mbn} />
              ) 
          })}
          <Box style={boxStyle}>
            <Paper elevation={4}>
              <div style={{position: "relative", float: "center"}}>
                  <Typography align="left" variant="subtitle1" color="initial">{"Minimum Bet Number " + this.state.mbn}</Typography>
                  <Typography align="left" variant="subtitle1" color="initial">{"Total Odd " + this.state.totalOdd}</Typography>
                  <Typography align="left" variant="subtitle1" color="initial">{"Expected Winning " + expected}</Typography>
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