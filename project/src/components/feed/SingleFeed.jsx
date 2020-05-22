import React, { Component } from 'react'
import {UserContext} from '../user-context';import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import expandIcon from './expand.png';
import FeedSummary from './bet/FeedSummary.jsx'
import FeedComments from './bet/FeedComments.jsx'
import FeedDetails from './bet/FeedDetails.jsx'

const divStyle = {
  border: "solid #000000",
  marginBottom: "10px",
  };

const iconStyle = {
    width: 50,
    height: 50,
};

class SingleFeed extends Component {
  constructor(props){
    super(props)
    this.state={
      bet_slip: this.props.bet_slip,
      username: this.props.username,
    }
  }

  calculateTotalOdd(){
    let totalOdd = 1;
    for(let i = 0; i < this.state.bet_slip.bets.length; i++){
      totalOdd = totalOdd *  this.state.bet_slip.bets[i].odd
    }
    return totalOdd;
  }

  componentDidMount(){
    this.setState({
      bet_slip: this.props.bet_slip,
      username: this.props.username,
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.bet_slip != this.props.bet_slip){
      this.setState({
        bet_slip: this.props.bet_slip,
        username: this.props.username,
      })
    } 
  }

  render() {
    console.log("id in single feed", this.state.bet_slip.bet_slip_id)
    return (
        <div style={divStyle}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                    <FeedSummary  username={this.state.username} totalOdd={this.calculateTotalOdd()} noOfMatches={this.state.bet_slip.bets.length}/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FeedDetails bet_slip={this.state.bet_slip}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <FeedComments bet_slip_id={this.state.bet_slip.bet_slip_id} userSuccess={this.props.userSuccess} id={this.props.id} likeCount={this.state.bet_slip.like_count} 
            comments={this.state.bet_slip.comments} updateFriends = {this.props.updateFriends}/>
        </div>
        );
  }
}

export default SingleFeed