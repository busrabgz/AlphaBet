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

    constructor(props){
        super(props);
    }

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance, loggedIn, updateFriends, dummyFriend, changeUserInfo, updateUserInfo} ) => (
        <div>
            <NavBar userBalance={balance} userSuccess={loggedIn} type={this.props.type} />
            <h1>Profile Page of {username}</h1>
            <UserInfoPanel userId={this.props.id} update={updateBalance} changeInfo={updateUserInfo} changeUser={changeUserInfo}/>
            <div>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                          <FriendsPanel userId={this.props.id} userSuccess={loggedIn} dummy={dummyFriend} />
                      </Paper>
                      <Paper elevation={10}>
                          <SearchResultsPanel userId={this.props.id} userSuccess={loggedIn} dummyFunc ={updateFriends}/>
                      </Paper>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                        <AchievementsPanel userId={this.props.id} userSuccess={loggedIn} />
                      </Paper>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} xs={12}>
                      <Paper elevation={10}>
                        <PendingPanel userId={this.props.id}/>
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