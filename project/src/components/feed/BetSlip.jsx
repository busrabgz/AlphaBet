import React, { Component } from 'react'
import {UserContext, userInfo} from '../user-context';
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
        </div>
    );
  }
}   

export default BetSlip