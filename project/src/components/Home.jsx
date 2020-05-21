import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import {UserContext} from './user-context';
import { Box, Paper } from '@material-ui/core';
import BetSlip from './feed/BetSlip.jsx';
import FilterPanel from './home/FilterPanel.jsx'
import BetsPanel from './home/BetsPanel.jsx'
import axios from 'axios'

const URL = "http://localhost:5000/";

const divStyle = {
  height: "calc(90% - 25em)",
  };

const rootBoxStyle = {
    float: "left",
    width: "calc(95% - 25em)",
    marginLeft: "15px",
}

const contests = [
  { name: "Champions League", type:"FOOTBALL" },
  { name: "Premier League", type: "FOOTBALL"},
  { name: "Turkish Super League", type: "FOOTBALL"},
  { name: "Bundesliga", type: "FOOTBALL" },
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBetButton = this.handleBetButton.bind(this)
  }

    handleBetButton(prop1, prop2) {
      axios.post(URL,
        {
            request_type: "add_bet_to_betslip",
            username: this.props.username,
            match_id: prop1,
            bet_id: prop2
         },
        {withCredentials: false})
        .then( res => {
            this.props.updateBetsInfo()
            })
         .catch(error => {
            console.log("login", error);
            });
    }

    handleSubmit() {
      var sortType = (this.props.filterInfo.sort_type == true ? "popularity" : "")
      var temp = []
      axios.post(URL,
        {
          "username": "",
          "request_type": "filter",
          "played_amount": "",
          "match_id": "",
          "bet_id": "",
          "editor_comment": "",
          "vote_side": "",
          "filter": {
              "sport_name": this.props.filterInfo.sport,
              "max_mbn": this.props.filterInfo.mbn,
              "contest": this.props.filterInfo.contest,
              "sort_type": sortType,
              "search_text": this.props.filterInfo.inputText
          }
       })
        .then( res => {
            console.log("result is: ", res.data)
            if (this.props.filterInfo.sport == "FOOTBALL") {
              for (var i = 0; i < res.data.matches.length; i++ ) {
                var match = {home: "", away: "", bets: { mr_one: {},
                                                    mr_draw         : {},
                                                    mr_two          : {},
                                                    over_2_5        : {},
                                                    under_2_5       : {},
                                                    one_one         :{},
                                                    one_zero        :{},
                                                    one_two         :{},
                                                    zero_one        : {},
                                                    zero_zero       : {},
                                                    zero_two        : {},
                                                    two_one         : {},
                                                    two_zero        : {},
                                                    two_two         : {},
                                                    redCardCount_0  :{},
                                                    redCardCount_1  :{},
                                                    cornerCountOver_7_5  :{},
                                                    cornerCountUnder_7_5 :{},
                                              }, match_id: ""};
  
                match.home = res.data.matches[i].bets[0].home_side;
                match.away = res.data.matches[i].bets[0].away_side;
                match.match_id = res.data.matches[i].match_id
                
                for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                  var type = res.data.matches[i].bets[j].bet_type;
                  switch(type) {
                    case "mr_one":
                       match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "mr_two":
                       match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
                    case "over_2_5":
                       match.bets.over_2_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
                    case "under_2_5":
                       match.bets.under_2_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd, 
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "one_one":
                       match.bets.one_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "one_zero":
                       match.bets.one_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "zero_one":
                       match.bets.zero_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "zero_zero":
                       match.bets.zero_zero = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "zero_two":
                       match.bets.zero_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
  
                    case "two_zero":
                       match.bets.two_zero = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "two_one":
                       match.bets.two_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "two_two":
                       match.bets.two_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "red_card_count_0":
                       match.bets.redCardCount_0 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
  
                    case "red_card_count_1":
                       match.bets.redCardCount_1 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "corner_count_over_7_5":
                       match.bets.cornerCountOver_7_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                       break;
  
                    case "corner_count_under_7_5":
                       match.bets.cornerCountUnder_7_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd,
                                        bet_id: res.data.matches[i].bets[j].bet_id};
                        break;
                    default: break;
                }
              }
              temp[i] = match
            }
          }
          if (this.props.filterInfo.sport == "BASKETBALL") {
            for (var i = 0; i < res.data.matches.length; i++ ) {
              var match = {home: "", away: "", bets: { mr_one: {},
              mr_two          : {},
              reboundOverX    : {},
              reboundUnderX   : {},
              totalScoreOverX: {},
              totalScoreUnderX: {},
              } };
              match.home = res.data.matches[i].bets[0].home_side;
              match.away = res.data.matches[i].bets[0].away_side;

              for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                var type = res.data.matches[i].bets[j].bet_type;
                switch(type) {
                  case "mr_one":
                     match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                      odd:res.data.matches[i].bets[j].odd,
                                      oldOdd: res.data.matches[i].bets[j].old_odd};
                      break;

                  case "mr_two":
                     match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                      odd:res.data.matches[i].bets[j].odd,
                                      oldOdd: res.data.matches[i].bets[j].old_odd};
                      break;
                  case "rebound_over_x":
                      match.bets.reboundOverX = {MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                  case "rebound_under_x":
                      match.bets.reboundUnderX = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                  case "total_score_over_x":
                    match.bets.totalScoreOverX = {MBN: res.data.matches[i].bets[j].mbn,
                      odd:res.data.matches[i].bets[j].odd,
                      oldOdd: res.data.matches[i].bets[j].old_odd}
                    break;
                  case "total_score_under_x":
                    match.bets.totalScoreUnderX = {MBN: res.data.matches[i].bets[j].mbn,
                      odd:res.data.matches[i].bets[j].odd,
                      oldOdd: res.data.matches[i].bets[j].old_odd}
                    break;
                  default: break;
              }
            }
            temp[i] = match
            }
          }

          if (this.props.filterInfo.sport == "TENNIS") {
            for (var i = 0; i < res.data.matches.length; i++ ) {
              var match = {home: "", away: "", bets: 
              { mr_one        : {},
              mr_two          : {},
              firstSetHome    : {},
              firstSetAway    : {},
              secondSetHome   : {},
              secondSetAway   : {},
              } };
              match.home = res.data.matches[i].bets[0].home_side;
              match.away = res.data.matches[i].bets[0].away_side;

              for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                var type = res.data.matches[i].bets[j].bet_type;
                switch(type) {
                  case "mr_one":
                     match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                      odd:res.data.matches[i].bets[j].odd,
                                      oldOdd: res.data.matches[i].bets[j].old_odd};
                      break;

                  case "mr_two":
                     match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                      odd:res.data.matches[i].bets[j].odd,
                                      oldOdd: res.data.matches[i].bets[j].old_odd};
                      break;
                  case "first_set_home":
                      match.bets.firstSetHome = {MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                  case "first_set_away":
                      match.bets.firstSetAway = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                  case "second_set_home":
                    match.bets.secondSetHome = {MBN: res.data.matches[i].bets[j].mbn,
                      odd:res.data.matches[i].bets[j].odd,
                      oldOdd: res.data.matches[i].bets[j].old_odd}
                    break;
                  case "second_set_away":
                    match.bets.secondSetAway = {MBN: res.data.matches[i].bets[j].mbn,
                      odd:res.data.matches[i].bets[j].odd,
                      oldOdd: res.data.matches[i].bets[j].old_odd}
                    break;
                  default: break;
              }
            }
            temp[i] = match
            }
          }

          this.setState({
            matches: temp
          })
        })
         .catch(error => {
            console.log("login", error);
            });
    }

  render() {
     
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, loggedIn, betsInfo, updateBetsInfo, selectedSport, updateSelectedSport, alphaCoins} ) => (
        <div>
            <NavBar updateLogIn={this.props.updateLogIn} updateType={this.props.updateType} type={this.props.type} userBalance={balance} isLogged={loggedIn} id = {this.props.id} alphaCoins={alphaCoins}/>
            <div style={divStyle}>
              <BetSlip betsInfo = {this.props.betsInfo} updateBetsInfo={updateBetsInfo}/>
              <Box style={rootBoxStyle}>
                <p>"WELCOME " {this.props.id}</p>
                <FilterPanel contests={contests} filterInfo = {this.props.filterInfo} updateFilterInfo = {this.props.updateFilterInfo} updateBetsInfo={updateBetsInfo} handleSubmit={this.handleSubmit} />
                <BetsPanel  matches={this.state.matches} betsInfo={betsInfo} selectedSport={this.props.filterInfo.sport} handleBet={this.handleBetButton}/>
            </Box>
           </div>

        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Home