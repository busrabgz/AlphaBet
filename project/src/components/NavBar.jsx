import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
const URL = "http://localhost:5000/profile";

const root = {
  flexGrow: 1,
}

const menuButton = {
  marginRight: "5px",
  marginLeft: "5px",
}

const title = {
  flexGrow: 0.1,
  marginRight: "5px",
}

const box = {
  maxHeight: 100,
  marginLeft: "20px",
}

const listItemText = {
  fontSize: '0.8em',
}

const logoutButton = {
  marginRight: 50,
}

const loginButton = {
  marginRight: 50,
}

const buttonGroup = {
  marginLeft: "30px",
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      alphaCoins: 0,
      type: this.props.type,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  //const classes = useStyles();
  //const balanceStr = "Balance: " + props.userBalance;
  //let button
  //let registerButton
  //console.log('success: ',props.userSuccess)

  handleClick(event){
    var bal = this.state.balance;
    var coin = this.state.alphaCoins;
    var ty = "";
    this.setState({balance: bal, alphaCoins: coin, type: ty});

    if (this.state.type == "user"){
        this.props.updateLogIn(false, "","", "", 0, 0);
    }
    this.props.updateType();

  }

  componentDidMount() {
    if (this.props.id != -1) {
      axios.post(URL,
        {
            "request_type": "get_user_info",
            "user_id": this.props.id
         },
        {withCredentials: false})
        .then( res => {
              this.setState({balance: res.data.result.account_balance, alphaCoins: res.data.result.alpha_coins
              })
            })
         .catch(error => {
            console.log("info", error);
            });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userBalance != this.props.userBalance) {
      if (this.props.id != -1) {
        axios.post(URL,
          {
              "request_type": "get_user_info",
              "user_id": this.props.id
           },
          {withCredentials: false})
          .then( res => {
              this.setState({balance: res.data.result.account_balance,
                })
              })
           .catch(error => {
              console.log("info", error);
              });
      }
    }
    if (prevProps.alphaCoins != this.props.alphaCoins) {
      if (this.props.id != -1) {
        axios.post(URL,
          {
              "request_type": "get_user_info",
              "user_id": this.props.id
           },
          {withCredentials: false})
          .then( res => {
              this.setState({alphaCoins: res.data.result.alpha_coins,
                })
              })
           .catch(error => {
              console.log("info", error);
              });
      }
    }
  }
  
  render() {  
    switch(this.state.type){
      case "admin":
        var navbar =  
        <AppBar style={{width: "100%"}} position="static">
            <Toolbar style={{width: "100%"}}>
              <Typography variant="h4" style={title}>AlphaBet</Typography>
              <Link style={{textDecoration: 'none'}} to="/dashboard"><Button size="large" variant="contained" style = {menuButton} color="primary">Dashboard</Button></Link>
              <Typography variant="h6" style={{flexGrow: 1,}}>
              </Typography>
              <Link to="/"><Button onClick={this.handleClick} style={logoutButton} size="medium" variant="contained" color="secondary">Logout</Button></Link>
            </Toolbar>  
          </AppBar>
          break;

        case "editor":
          var navbar = 
          <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" style={title}>AlphaBet</Typography>
              <Link style={{textDecoration: 'none'}} to='/editorHome'><Button size="large" variant="contained" style={menuButton} color="primary">Home</Button></Link>
              <Typography variant="h6" style={{flexGrow: 1,}}></Typography>
              <Link to="/"><Button onClick={this.handleClick} style={logoutButton} size="medium" variant="contained" color="secondary">Logout</Button></Link>
          </Toolbar>
        </AppBar>
        break;

      case "user":
        var navbar = 
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" style={title}>AlphaBet</Typography>
            <Link style={{textDecoration: 'none'}} to='/'><Button size="large" variant="contained" style = {menuButton} color="primary">Home</Button></Link>
            <Link style={{textDecoration: 'none'}} to="/profile"><Button size="large" variant="contained" style = {menuButton} color="primary">Profile</Button></Link>
            <Link style={{textDecoration: 'none'}} to="/editors"><Button  size="large" variant="contained" style = {menuButton} color="primary">Editors</Button></Link>
            <Link style={{textDecoration: 'none'}} to="/feed"><Button size="large" variant="contained" style = {menuButton} color="primary">Feed</Button></Link>
            <Link style={{textDecoration: 'none'}} to="/market"><Button size="large" variant="contained" style = {menuButton} color="primary"> Market</Button></Link>
            <Typography variant="h6" style={{flexGrow: 1,}}></Typography>
            <Box style={box} my={-5}>
              <List component="nav">
                <Box mb={-2}><ListItem>
                  <ListItemText style = {listItemText} primary={"Balance: " + this.state.balance}></ListItemText>
                </ListItem></Box>
                <Box mt={-1}><ListItem>
                  <ListItemText style = {listItemText} primary={"AlphaCoins: " + this.state.alphaCoins}></ListItemText>
                </ListItem></Box>
              </List></Box>
              <Link to="/"><Button onClick={this.handleClick} style={logoutButton} size="medium" variant="contained" color="secondary">Logout</Button></Link>
          </Toolbar>
        </AppBar>
        break;

      default:
        var navbar = 
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" style={title}>AlphaBet</Typography>
            <Link style={{textDecoration: 'none'}} to='/'><Button size="large" variant="contained" style = {menuButton} color="primary">Home</Button></Link>
            <Typography variant="h6" style={{flexGrow: 1,}}></Typography>
            <ButtonGroup color="primary" aria-label="outlined primary button group" style={buttonGroup}>
              <Link to='/register' style={{textDecoration: 'none'}}>
                <Button size="medium" style = {menuButton} variant="contained" color="secondary" >Register</Button>
              </Link>
              <Link to='/signin' style={{textDecoration: 'none'}}>
                <Button size="medium" style = {loginButton} variant="contained" color="secondary">Login</Button>
              </Link>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        break;
    }
    return(navbar);
  }
}

export default NavBar
