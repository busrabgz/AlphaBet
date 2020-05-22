import React, { Component } from 'react'
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
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';

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

class WithdrawCash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      balance: 0,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBalanceChange = this.handleBalanceChange.bind(this)
  }

  handleSubmit() {
    let temp = this.state.balance * -1
    temp = parseInt(temp)
    axios.post(URL,
      {
          "request_type": "update_balance",
          "user_id": this.props.userId,
          "balance_change": temp
       },
      {withCredentials: false})
      .then( res => {
          if(res.data.result.success){
              this.props.updateBalance(temp)
          }
          })
       .catch(error => {
          console.log("info", error);
          });
    this.handleClose();

  }

  handleBalanceChange(event) {
    this.setState({
      balance: event.target.value
    })
  }

  handleClickOpen() {
    this.setState({
      open: true
    }) 
  }

  handleClose() {
    this.setState({
      open: false
    })
  }
  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Withdraw Cash
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To withdraw cash, please enter the amount here.
              If you enter an amount more than the current balance, you will withdraw whole cash.
              We will update the balance as you confirm.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Withdraw Amount"
              type="amount"
              value={this.state.balance}
              onChange={this.handleBalanceChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
}
class AddBalance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      balance: 0
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBalanceChange = this.handleBalanceChange.bind(this)
  }

  handleBalanceChange(event) {
    this.setState({
      balance: event.target.value
    })
  }

  handleClickOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleSubmit() {
    axios.post(URL,
      {
          "request_type": "update_balance",
          "user_id": this.props.userId,
          "balance_change":this.state.balance
       },
      {withCredentials: false})
      .then( res => {
          if(res.data.result.success){
              this.props.updateBalance(parseInt(this.state.balance))
          }
          })
       .catch(error => {
          console.log("info", error);
          });
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Balance
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Balance</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update your balance, please enter the amount here. We will update the balance as you confirm.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="balance"
              label="Enter Balance"
              type="balance"
              value={this.state.balance}
              onChange={this.handleBalanceChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      open: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleClickOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleSubmit() {
    axios.post(URL,
      {
          "request_type": "edit_profile",
          "user_id": this.props.userId,
          "new_username": this.state.username,
          "new_password": this.state.password
       },
      {withCredentials: false})
      .then( res => {
          if(res.data.result.success){
              this.props.updateUserInfo()
          }
          })
       .catch(error => {
          console.log("info", error);
          });
   this.handleClose();
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Edit Profile
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit your profile, please enter information here. We will update as you confirm.
            </DialogContentText>
            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


class UserInfoPanel extends Component {
    constructor(props){
        super(props);
        this.updateBalance = props.update;
        this.state = {username: '', name: '', total_winnings: '', email: ''}
  
    };

    componentDidMount() {
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
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.dummyUser != this.props.dummyUser) {
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
      }
    }

  render() {
    return (
      <div>
          <Grid container spacing={3}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Paper style={paperStyle}>
                      <div style={divStyle}>
                          <Avatar style={avatarStyle} alt="Remy Sharp" src={avatarIcon} />
                          <div style={{paddingLeft: 200, position: "relative", float: "center"}}>
                            <Typography align="left" variant="h5" color="initial">{this.state.username}</Typography>
                            <Typography align="left" variant="h5" color="initial">{this.state.name}</Typography>
                            <Typography align="left" variant="h5" color="initial">{this.state.email}</Typography>
                            <Typography align="left" variant="h5" color="initial">{this.state.total_winnings}</Typography>
                          </div>
                      </div>
                  </Paper>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                    <ButtonGroup
                      style={buttonGroupStyle}
                      orientation="vertical"
                      color="primary"
                      aria-label="vertical contained primary button group"
                      variant="contained"
                      fullWidth={true}
                      size="large"
                    >
                          <EditProfile userId={this.props.userId} updateUserInfo={this.props.updateUserInfo}/>
                          <AddBalance updateUserInfo={this.props.updateUserInfo} userId = {this.props.userId} updateBalance={this.props.updateBalance}/>
                          <WithdrawCash updateUserInfo={this.props.updateUserInfo} userId = {this.props.userId} updateBalance={this.props.updateBalance}/>
                    </ButtonGroup>
              </Grid>
        </Grid>
      </div>);
  }
}

export default UserInfoPanel