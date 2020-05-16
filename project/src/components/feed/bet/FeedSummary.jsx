import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../../user-context';
import Avatar from '@material-ui/core/Avatar';
import avatarIcon from './avatar.png';
import Card from '@material-ui/core/Card';

const divStyle = {
  width: "19%",
  display : 'inline-block',
  height: '80%',
  textAlign: 'center',
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  margin: "10px",
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

  render() {
    return (
        <Card style={compStyle}>
            <Avatar style={iconStyle} src={avatarIcon}/>
            <Card style={divStyle}>username here</Card>
            <Card style={divStyle}>number of matches</Card>
            <Card style={divStyle}>total odds:</Card>
        </Card>
  )}
}

export default BetSummary