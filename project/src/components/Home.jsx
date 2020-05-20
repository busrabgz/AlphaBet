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

const basketballResults = [
  {
      home: "Oklahoma",
      away: "Oklavino", 
      bets: { 
      mr_one          : {odd: "1.4", MBN: "NBA", oldOdd: "ESK"},
      mr_zero         : {odd: "6.9", MBN: "NBA", oldOdd: "ESK"},
      mr_two          : {odd: "1.8", MBN: "NBA", oldOdd: "ESK"},
      reboundOverX    : {odd: "4.1", MBN: "NBA", oldOdd: "ESK"},
      reboundUnderX   : {odd: "1.2", MBN: "NBA", oldOdd: "ESK"},
      totalScoreOverX: {odd: "3.1", MBN: "NBA", oldOdd: "ESK"},
      totalScoreUnderX: {odd: "1.3", MBN: "NBA", oldOdd: "ESK"},
          }, 
      date  : "13/4/20",
  },
  {
      home: "ChicagoBulls",
      away: "AngaraBoys", 
      bets: { 
      mr_one          : {odd: "1.4", MBN: "NBA", oldOdd: "ESK"},
      mr_zero         : {odd: "6.9", MBN: "NBA", oldOdd: "ESK"},
      mr_two          : {odd: "1.8", MBN: "NBA", oldOdd: "ESK"},
      reboundOverX    : {odd: "4.1", MBN: "NBA", oldOdd: "ESK"},
      reboundUnderX   : {odd: "1.2", MBN: "NBA", oldOdd: "ESK"},
      totalScoreOverX: {odd: "3.1", MBN: "NBA", oldOdd: "ESK"},
      totalScoreUnderX: {odd: "1.3", MBN: "NBA", oldOdd: "ESK"},
          }, 
      date  : "13/4/20",
  },
]

const tennisResults = [
  {
      home: "Maria Sharapova",
      away: "Serena Williams", 
      bets: { 
      mr_one          : {odd: "1.4", MBN: "NBA", oldOdd: "ESK"},
      mr_two          : {odd: "1.8", MBN: "NBA", oldOdd: "ESK"},
      firstSetHome    : {odd: "4.1", MBN: "NBA", oldOdd: "ESK"},
      firstSetAway    : {odd: "1.2", MBN: "NBA", oldOdd: "ESK"},
      secondSetHome   : {odd: "3.1", MBN: "NBA", oldOdd: "ESK"},
      secondSetAway   : {odd: "1.3", MBN: "NBA", oldOdd: "ESK"},
          }, 
      date  : "13/4/20",
  },
  {
      home: "Maria Sharapova",
      away: "Serena Williams", 
      bets: { 
      mr_one          : {odd: "1.4", MBN: "NBA", oldOdd: "ESK"},
      mr_two          : {odd: "1.8", MBN: "NBA", oldOdd: "ESK"},
      firstSetHome    : {odd: "4.1", MBN: "NBA", oldOdd: "ESK"},
      firstSetAway    : {odd: "1.2", MBN: "NBA", oldOdd: "ESK"},
      secondSetHome   : {odd: "3.1", MBN: "NBA", oldOdd: "ESK"},
      secondSetAway   : {odd: "1.3", MBN: "NBA", oldOdd: "ESK"},
          }, 
      date  : "15/4/20",
  },
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
    { ( {username, balance, updateBalance, loggedIn, betslip, filterInfo, updateFilterInfo, betsInfo, updateBetsInfo, selectedSport, updateSelectedSport} ) => (
        <div>
            <NavBar userBalance={balance} userSuccess={loggedIn}/>
            <div style={divStyle}>
              <BetSlip slip={betslip} />
              <Box style={rootBoxStyle}>
                <p>"WELCOME " {this.props.id}</p>
                <FilterPanel contests={contests} filterInfo = {filterInfo} updateSelectedSport={updateSelectedSport} updateFilterInfo = {updateFilterInfo} updateBetsInfo={updateBetsInfo} />
                <BetsPanel tennMatches={tennisResults} baskMatches={basketballResults} selectedSport={selectedSport} betsInfo={betsInfo}/>
            </Box>
           </div>

        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Home