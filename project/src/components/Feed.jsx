import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import FeedPanel from './feed/FeedPanel.jsx'
import BetSlip from './feed/BetSlip.jsx'
import Button from '@material-ui/core/Button';
import {UserContext} from './user-context';
import axios from 'axios';


const URL = "http://localhost:5000/feed";

const divStyle = {
  height: "calc(90% - 25em)",
  };


class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    if(this.props.userSuccess){
      axios.post(URL, 
        {
          "request_type": "display_shared_bets",
          "user_id": this.props.id,
          "comment_text": "",
          "focused_bet_slip_id": ""
        },
        {withCredentials: false})
        .then( res => {
          console.log(res.data)
          let temp = [];
          for(var i = 0; i < res.data.users.length; i++){
            temp[i] = res.data.users[i]
          }
          this.setState({users: temp})
        })
        .catch( (error) => {
          console.log("info", error)
        });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.dummyFriend != this.props.dummyFriend) {
      if(this.props.userSuccess){
        axios.post(URL, 
          {
            "request_type": "display_shared_bets",
            "user_id": this.props.id,
            "comment_text": "",
            "focused_bet_slip_id": ""
          },
          {withCredentials: false})
          .then( res => {
            console.log(res.data)
            let temp = [];
            for(var i = 0; i < res.data.users.length; i++){
              temp[i] = res.data.users[i]
            }
            this.setState({users: temp})
          })
          .catch( (error) => {
            console.log("info", error)
          });
      }
    }
  }

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, betslip, loggedIn, alphaCoins} ) => (
        <div>
            <NavBar updateLogIn={this.props.updateLogIn} updateType={this.props.updateType} type={this.props.type}  userBalance={balance} id = {this.props.id} isLogged={loggedIn} alphaCoins={alphaCoins}/>
            <div style={divStyle}>
                <BetSlip id={this.props.id}/>
                <FeedPanel userSuccess={this.props.userSuccess} id={this.props.id} username={this.props.username} users={this.state.users} updateFriends = {this.props.updateFriends}/>
            </div>
        </div>
        )}
        </UserContext.Consumer>
      );
  }
}

export default Feed