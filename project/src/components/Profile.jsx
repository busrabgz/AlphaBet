import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import UserInfoPanel from './profile/UserInfoPanel.jsx'
import FriendsPanel from './profile/FriendsPanel.jsx'
import SearchResultsPanel from './profile/SearchResultsPanel.jsx'
import AchievementsPanel from './profile/AchievementsPanel.jsx'
import PendingPanel from './profile/PendingPanel.jsx'
import EndedPanel from './profile/EndedPanel.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {UserContext} from './user-context';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

class Profile extends Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div>
            <NavBar userBalance={balance}/>
            <h1>Profile Page of {username}</h1>
            <UserInfoPanel username={username} update={updateBalance}/>
            <div>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                          <FriendsPanel />
                      </Paper>
                      <Paper elevation={10}>
                          <SearchResultsPanel />
                      </Paper>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                        <AchievementsPanel />
                      </Paper>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                        <PendingPanel />
                      </Paper>
                    </Grid>
                     <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                        <EndedPanel/>
                      </Paper>
                    </Grid>
              </Grid>
            </div>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default Profile