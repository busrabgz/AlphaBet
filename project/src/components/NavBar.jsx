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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 0.1,
    marginRight: theme.spacing(5),
  },
  box: {
    maxHeight: 100,
    marginLeft: theme.spacing(20),
  },
  listItemText: {
    fontSize: '0.8em',
  },
  logoutButton: {
    marginLeft: theme.spacing(10),

  },
  buttonGroup: {
    marginLeft: theme.spacing(15),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const balanceStr = "Balance: " + props.userBalance;
  let button
  let registerButton
  console.log('success: ',props.userSuccess)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            AlphaBet
          </Typography>
            <Link to='/'>
              <Button color="white">
              Home
              </Button>
            </Link>
            {props.type != "admin"
              ? <div>
              <Button color="inherit">
                <Link to="/about">About</Link>
              </Button>
              <Button color="inherit">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button color="inherit">
                <Link to="/editors">Editors</Link>
              </Button>
              </div>
              :<Button color="inherit">
                <Link to="/dashboard">Dashboard</Link>
              </Button>  
            }

              {props.type != "admin" &&
                <div>
                  <Button color="white">
                        <Link to="/feed">Feed</Link>
                  </Button>
                  <Button className={classes.menuButton} color="inherit">
                        <Link to="/market">Market</Link>
                  </Button>
                </div>
                
              }
          <Box className={classes.box} my={-5}>
            <List component="nav">
              <Box mb={-2}>
              <ListItem>
                <ListItemText classes={{primary:classes.listItemText}} primary={balanceStr}></ListItemText>
              </ListItem>
              </Box>
              <Box mt={-1}>
              <ListItem>
                <ListItemText classes={{primary:classes.listItemText}} primary="AlphaBet: "></ListItemText>
              </ListItem>
              </Box>
            </List>
          </Box>
          <div style={{float:"right"}}>
             {props.userSuccess
                ? <Button className={classes.logoutButton} size="small" variant="contained" color="secondary"> Logout</Button>
                : <ButtonGroup color="primary" aria-label="outlined primary button group" className={classes.buttonGroup}>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                      <Button size="small" variant="contained" color="secondary" >Register</Button>
                   </Link>
                    <Link to='/signin' style={{textDecoration: 'none'}}>
                      <Button size="small" variant="contained" color="secondary">Login</Button>
                      </Link>
              </ButtonGroup>
             }
         </div>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
