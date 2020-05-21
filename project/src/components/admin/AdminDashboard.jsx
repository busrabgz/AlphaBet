import React from 'react'
import NavBar from '../NavBar.jsx'
import { Grid, Button, ButtonBase, Paper, ButtonGroup, Tabs, Tab, AppBar, Box, Typography} from '@material-ui/core'
import { UserContext } from '../user-context.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";   
import EditorRequest from "./EditorRequest.jsx"
import AdminBanPage from "./AdminBanPage.jsx"
import AdminAchievements from './AdminAchievement.jsx';
import AdminMarket from './AdminMarket.jsx';
import AdminChangeBet from './AdminChangeBet.jsx';

const buttonStyle = {
    backgroundColor: '#4e4b57',
    color: "white",
}

const imageRoot = {
    width: 150,
    height: 150,
}

const image = {
    maxHeight: 150,
    maxWidth: 150,
}

const divStyle = {
    display: "inline-block",
}
const gridRoot = {
    top: "50px"
}

const groupStyle = {
    
}

const matches = [
    {
      home      : "Real Madrid",
      away      : "Galatasaray",
      bets : {
        mr_one          : { MBN: 1, odd : "1.20" , oldOdd : "old 1.20"},
        mr_draw         : { MBN: 1, odd : "3.40", oldOdd : "old 1.20"},
        mr_two          : { MBN: 1, odd : "5.60"}, oldOdd : "old 1.20",    
        over_2_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
        under_2_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
        over_1_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
        under_1_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
        one_one         : { MBN: 2, odd : "6.0", oldOdd : "old 1.20"},
        one_zero        : { MBN: 2, odd : "3.9", oldOdd : "old 1.20"},
        one_two         : { MBN: 2, odd : "2.0", oldOdd : "old 1.20"},
        zero_one        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        zero_zero       : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        zero_two        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_one         : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_zero        : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_two         : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        redCardCount_0  : { MBN: 4, odd : "1.8", oldOdd : "old 1.20"},
        redCardCount_1  : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
        redCardCount_2  :  { MBN: 4, odd : "7.0", oldOdd : "old 1.20"},
        yellowCardCount_0     : { MBN: 4, odd : "3.0", oldOdd : "old 1.20"},
        yellowCardCount_1     : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
        yellowCardCount_2     : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
        cornerCountOver_7_5  : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
        cornerCountUnder_7_5 : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      },
      date  : "13/4/20",
      votes  : { home: 75, draw: 50, away: 42},
    },
    {
      home      : "Beşiktaş",
      away      : "Olimpiakos",
      bets : {
        mr_one    : { MBN: 1, odd : "1.20", oldOdd : "old 1.20"},
        mr_draw   : { MBN: 1, odd : "3.40", oldOdd : "old 1.20"},
        mr_two    : { MBN: 1, odd : "5.60", oldOdd : "old 1.20"},    
        over_2_5  : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
        under_2_5 : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
        over_1_5        : { MBN: 3, odd : "1.40", oldOdd : "old 1.20"},
        under_1_5       : { MBN: 3, odd : "2.80", oldOdd : "old 1.20"},
        one_one   : { MBN: 2, odd : "6.0", oldOdd : "old 1.20"},
        one_zero  : { MBN: 2, odd : "2.0", oldOdd : "old 1.20"},
        one_two   : { MBN: 2, odd : "3.9", oldOdd : "old 1.20"},
        zero_one  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        zero_zero : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        zero_two  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_one   : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_zero  : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        two_two   : { MBN: 2, odd : "1.20", oldOdd : "old 1.20"},
        redCardCount_0  : { MBN: 4, odd : "1.8", oldOdd : "old 1.20"},
        redCardCount_1  : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
        redCardCount_2  :  { MBN: 4, odd : "7.0", oldOdd : "old 1.20"},
        yellowCardCount_0     : { MBN: 4, odd : "3.0", oldOdd : "old 1.20"},
        yellowCardCount_1     : { MBN: 4, odd : "2.4", oldOdd : "old 1.20"},
        yellowCardCount_2     : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
        cornerCountOver_7_5  : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
        cornerCountUnder_7_5 : { MBN: 4, odd : "6.4", oldOdd : "old 1.20"},
      },
      date  : "13/4/20",
      votes  : { home: 60, draw: 55, away: 22},
    },
  ]

function TabPanel(props) {
    const { children, value, index} = props;
  
    return (
      <div>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  
  
function AdminTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                <Tab label="manage users"  />
                <Tab label="manage editors" />
                <Tab label="change remove odds"  />
                <Tab label="modify market"  />
                <Tab label="modify achievements"  />
                </Tabs>
            </AppBar>
                <div>
                    <TabPanel value={value} index={0}>
                        <AdminBanPage id={props.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <EditorRequest/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <AdminChangeBet matches={matches}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <AdminMarket id={props.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <AdminAchievements id={props.id}/>
                    </TabPanel>
                </div>
        </div>
    );
}

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            admin_id: this.props.id,
            update: false,
        }
    }

    render() {
        return(
        <UserContext.Consumer>
        { ( {username, balance, updateBalance, loggedIn} ) => (
            <div>
                <NavBar type={this.props.type} userBalance={balance} userSuccess={loggedIn} />
                <div>
                    <Grid container spacing={3} direction="row" style={gridRoot}>
                        <Grid item lg={1}>
                            <ButtonBase style={imageRoot}>
                                <img style={image} src="https://media-exp1.licdn.com/dms/image/C4D03AQG5hIVQ1SFhFA/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=uGSpA_tanTPGBuFh4VSYR2_rN9mVWWXkO3vhUCcXvy8" />
                            </ButtonBase>
                        </Grid>
                        <Grid item lg={2}>
                            <h3>Yüce Kılıç</h3>
                        </Grid>
                    </Grid>
                </div>
                <AdminTabs id={this.state.admin_id}/>
            </div>
        )}
        </UserContext.Consumer>)
    }
}

export default AdminDashboard