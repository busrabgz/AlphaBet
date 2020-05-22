import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../../user-context';
import Avatar from '@material-ui/core/Avatar';
import avatarIcon from './avatar.png';
import Card from '@material-ui/core/Card';

const divStyle = {
  width: "19%",
  display : 'inline-block',
  textAlign: 'center',
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  margin: "10px",
  marginBottom: 10,
  padding: 15
};

const compStyle = {
  display : 'inline-block',
  width: "100%",
};

const iconStyle = {
    margin: "10px",
    border: "solid #000000",
    width: 100,
    height: 100,
    float: "left",
    display : 'inline-block',
    backgroundColor: "#FFFFFF",
};

class BetSummary extends Component {
  constructor(props){
    super(props)
    this.state={
      noOfMatches: this.props.noOfMatches,
      totalOdd: this.props.totalOdd,
      username: this.props.username,
    }
  }

  componentDidMount(){
    this.setState({
      noOfMatches: this.props.noOfMatches,
      totalOdd: this.props.totalOdd,
      username: this.props.username,
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.bet_slip != this.props.bet_slip){
      this.setState({
        noOfMatches: this.props.noOfMatches,
        totalOdd: this.props.totalOdd,
        username: this.props.username,
      })
    } 
  }
  render() {
    return (
        <Card style={compStyle}>
            <Card style={divStyle}>{this.state.username}</Card>
            <Card style={divStyle}>Number of Matches : {this.state.noOfMatches}</Card>
            <Card style={divStyle}>Total Odd: {this.state.totalOdd}</Card>
        </Card>
  )}
}

export default BetSummary