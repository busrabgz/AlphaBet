import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {UserContext} from './user-context';
import { Box, Paper } from '@material-ui/core';
import BetSlip from './feed/BetSlip.jsx';
import FilterPanel from './home/FilterPanel.jsx'
import BetsPanel from './home/BetsPanel.jsx'

const divStyle = {
  height: "calc(90% - 25em)",
  };

const rootBoxStyle = {
    float: "left",
    width: "calc(95% - 25em)",
    marginLeft: "15px",
}

const contests = [
  { name: "UEFA Champions League" },
  { name: "Premier League" },
  { name: "Turkish Super League" },
  { name: "Bundesliga" },
]

const matches = [
  {
    home      : "Real Madrid",
    away      : "Galatasaray",
    bets : {
      mr_one          : { MBN: 1, odd : "1.20" , oldOdd : "old 1.20"},
      mr_draw         : { MBN: 1, odd : "3.40", oldOdd : "old 1.20"},
      mr_two          : { MBN: 1, odd : "5.60"}, oldOdd : "old 1.20",    
      over_2_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
      under_2_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
      over_1_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
      under_1_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
      one_one         : { MBN: 2, odd : "6.0", oldOdd : "old 1.20"},
      one_zero        : { MBN: 2, odd : "3.9", oldOdd : "old 1.20"},
      one_two         : { MBN: 2, odd : "2.0", oldOdd : "old 1.20"},
      zero_one        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      zero_zero       : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      zero_two        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_one         : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_zero        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_two         : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      redCardCount_0  : { MBN: 4, odd : "1.8", oldOdd : "old 1.20"},
      redCardCount_1  : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
      redCardCount_2  :  { MBN: 4, odd : "7.0", oldOdd : "old 1.20"},
      yellowCardCount_0     : { MBN: 4, odd : "3.0", oldOdd : "old 1.20"},
      yellowCardCount_1     : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
      yellowCardCount_2     : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      cornerCountOver_7_5  : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      cornerCountUnder_7_5 : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
    },
    date  : "13/4/20",
    votes  : { home: 75, draw: 50, away: 42},
  },
  {
    home      : "Beşiktaş",
    away      : "Olimpiakos",
    bets : {
      mr_one    : { MBN: 1, odd : "1.20", oldOdd : "old 1.20"},
      mr_draw   : { MBN: 1, odd : "3.40", oldOdd : "old 1.20"},
      mr_two    : { MBN: 1, odd : "5.60", oldOdd : "old 1.20"},    
      over_2_5  : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
      under_2_5 : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
      over_1_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
      under_1_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
      one_one   : { MBN: 2, odd : "6.0", oldOdd : "old 1.20"},
      one_zero  : { MBN: 2, odd : "2.0", oldOdd : "old 1.20"},
      one_two   : { MBN: 2, odd : "3.9", oldOdd : "old 1.20"},
      zero_one  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      zero_zero : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      zero_two  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_one   : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_zero  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      two_two   : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
      redCardCount_0  : { MBN: 4, odd : "1.8", oldOdd : "old 1.20"},
      redCardCount_1  : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
      redCardCount_2  :  { MBN: 4, odd : "7.0", oldOdd : "old 1.20"},
      yellowCardCount_0     : { MBN: 4, odd : "3.0", oldOdd : "old 1.20"},
      yellowCardCount_1     : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
      yellowCardCount_2     : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      cornerCountOver_7_5  : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      cornerCountUnder_7_5 : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
    },
    date  : "13/4/20",
    votes  : { home: 60, draw: 55, away: 22},
  },
]

class Home extends Component {
  constructor(props) {
    super(props)
    }

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, loggedIn, betslip, alphaCoins} ) => (
        <div>
            <NavBar type={this.props.type} userBalance={balance} isLogged={loggedIn} id = {this.props.id} alphaCoins={alphaCoins}/>
            <div style={divStyle}>
              <BetSlip slip={betslip} />
              <Box style={rootBoxStyle}>
                <p>"WELCOME " {this.props.id}</p>
                <FilterPanel contests={contests}/>
                <BetsPanel matches={matches}/>
            </Box>
           </div>

        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Home