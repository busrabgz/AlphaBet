import React, { Component } from 'react'
import NavBar from '../NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import avatarIcon from './avatar.png'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import expandLess from './expandless.png';
import expandMore from './expandmore.png';
import axios from 'axios';

const URL = "http://localhost:5000/profile";

const avatarStyle = {
    height: 127,
    width: 127,
    display: "inline-block",
    float: "left",
    left: 15,
    bottom: 10,
};

const iconStyle = {
    height: 20,
    width: 20,
    display: "inline-block",
}

const listStyle = {
    padding: 0,
    display: "inline-block",
};

const buttonGroupStyle = {
    size:"xl",
};

const divStyle = {
    margin: 10,
};

const paperStyle = {
    display: "inline-block",
    width: "100%",
}

class UserInfoPanel extends Component {
    constructor(props){
        super(props);
        this.updateBalance = props.update;
        this.state = {username: '', name: '', total_winnings: '', email: ''}

        console.log(this.props.userId);
        axios.post(URL,
        {
            "request_type": "get_user_info",
            "user_id": this.props.userId
         },
        {withCredentials: false})
        .then( res => {
            this.setState({username: res.data.result.username,
                            name: res.data.result.forename + "  " + res.data.result.surname,
                            total_winnings: res.data.result.total_winnings,
                            email: res.data.result.email})
            })
         .catch(error => {
            console.log("info", error);
            });
    };

  render() {
    return (
            <div>
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Paper style={paperStyle}>
                            <div style={divStyle}>
                                <Avatar style={avatarStyle} alt="Remy Sharp" src={avatarIcon} />
                                <List
                                  style={listStyle}
                                  component="nav"
                                >
                                  <ListItem>
                                    <ListItemIcon><Avatar style={iconStyle} alt="Remy Sharp" src={avatarIcon} /></ListItemIcon>
                                    <ListItemText primary={this.state.username} />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon><Avatar style={iconStyle} alt="Remy Sharp" src={avatarIcon} /></ListItemIcon>
                                    <ListItemText primary={this.state.name} />
                                  </ListItem>
                                </List>
                                <List
                                  style={listStyle}
                                  component="nav"
                                >
                                  <ListItem>
                                    <ListItemIcon><Avatar style={iconStyle} alt="Remy Sharp" src={avatarIcon} /></ListItemIcon>
                                    <ListItemText primary={this.state.total_winnings} />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon><Avatar style={iconStyle} alt="Remy Sharp" src={avatarIcon} /></ListItemIcon>
                                    <ListItemText primary={this.state.email} />
                                  </ListItem>
                                </List>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Paper>
                          <ButtonGroup
                            style={buttonGroupStyle}
                            orientation="vertical"
                            color="primary"
                            aria-label="vertical contained primary button group"
                            variant="contained"
                            fullWidth={true}
                            size="large"
                          >
                                <Button>Edit Profile</Button>
                                <Button onClick={this.updateBalance}>Add Balance</Button>
                                <Button>Withdraw Cash</Button>
                          </ButtonGroup>
                      </Paper>
                    </Grid>
              </Grid>
            </div>);
  }
}

export default UserInfoPanel