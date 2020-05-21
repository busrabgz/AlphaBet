import React, { Component } from 'react'
import NavBar from '../NavBar.jsx'
import {UserContext} from '../user-context';
import FilterPanel from '.././home/FilterPanel'
import axios from 'axios'
import { Button, Card, Typography, Grid, TableBody, Table, TableContainer, Paper, TableHead, TableCell, TableRow, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Collapse, CardContent, CardActions, Tooltip, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Dialog, Box } from '@material-ui/core'

const URL = "http://localhost:5000/";
const URL_admin = "http://localhost:5000/admin-dashboard/modify-bets";

const summaryStyling = {
    height: 40,
}
const detailStyling = {
    border: "solid 1px",
}

const contentStyle = {
    padding: 0, margin: 0,
}

const buttonStyle = {
}

class ActionCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            newOdd: ""
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeOdd = this.changeOdd.bind(this)
        this.cancelOdd = this.cancelOdd.bind(this)
    }

    cancelOdd(){
        axios.post(URL_admin, 
            {
                "request_type": "cancel_bet",
                "bet_id": this.props.id,
                "match_id": this.props.match_id
            },
            {withCredentials: false})
                .then( res => {    
                })
                .catch( (error) => {
                console.log("info", error)
            });
        this.handleClose()
    }

    changeOdd(){
        axios.post(URL_admin, 
            {
                "request_type": "change_odd",
                "new_odd_value": this.state.newOdd,
                "bet_id": this.props.id,
                "match_id": this.props.match_id
            },
            {withCredentials: false})
                .then( res => {    
                })
                .catch( (error) => {
                console.log("info", error)
            });
        this.handleClose()
    }

    handleChange(event) {
        this.setState({
          newOdd: event.target.value
        })
      }

    handleClickOpen() {
        this.setState({
          newOdd: "",
          open: true
        }) 
      }
    
      handleClose() {
        this.setState({
          newOdd: "",
          open: false
        })
      }

    render(){
    return(
    <Card style={{ height: 30, display: "inline-flex", overflowX: "hidden"}}>
        <CardContent style={contentStyle}>
            {this.props.mbn == undefined 
            ? <Typography style={{fontSize: 12, paddingLeft: 6, paddingTop: 6,}} color="primary" gutterBottom>
                {this.props.text + " - MBN: N/A"  + " Odd: N/A" }
            </Typography>
            : <Typography style={{fontSize: 12, paddingLeft: 6, paddingTop: 6,}} color="primary" gutterBottom>
                {this.props.text + " - MBN: " + this.props.mbn + " Odd: " + this.props.odd}
            </Typography>}
        </CardContent>
        <CardActions style={contentStyle}>
            <Button onClick={this.handleClickOpen} style={buttonStyle}>Change
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Modify Bet</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Enter new odd or disable bet completely 
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="newOdd"
                label="Enter New Odd"
                type="balance"
                value={this.state.balance}
                onChange={this.handleChange}
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={this.cancelOdd} color="secondary">
                Disable
                </Button>
                <Button onClick={this.changeOdd} color="primary">
                    Confirm
                </Button>
            </DialogActions>
            </Dialog>
        </CardActions>
    </Card>
    );
    }
}

function VoteCard(props){
    const contentStyle = {
        padding: 0, margin: 0,
    }

    const buttonStyle = {
    }
    return(
    <Card style={{ height: 40, display: "inline-flex", overflowX: "hidden"}}>
        <CardContent style={contentStyle}>
            <Typography style={{fontSize: 12, paddingLeft: 6, paddingTop: 6,}} color="primary" gutterBottom>
                {props.text + " : " + props.votes}
            </Typography>
        </CardContent>
        <CardActions style={contentStyle}>
            <Button style={buttonStyle}>
                Vote
            </Button>
        </CardActions>
    </Card>
    );
}

function RenderBasketballMatchRow(props){
    function renderVote(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Tooltip><Typography variant="subtitle2" color="initial">Vote for Winning Side!</Typography></Tooltip>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title="add"><TableCell style={cellStyle}><VoteCard text={"Home"} votes={props.match.votes.home}/></TableCell></Tooltip>
                    <TableCell style={cellStyle}><VoteCard text={"Draw"} votes={props.match.votes.draw}/></TableCell>
                    <TableCell style={cellStyle}><VoteCard text={"Away"} votes={props.match.votes.away}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderMR(){

        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.mr_one.oldOdd && "Changed from " + props.match.bets.mr_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Home"} mbn={props.match.bets.mr_one.MBN} odd={props.match.bets.mr_one.odd} id={props.match.bets.mr_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_two.oldOdd && "Changed from " + props.match.bets.mr_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Away"} mbn={props.match.bets.mr_two.MBN} odd={props.match.bets.mr_two.odd} id={props.match.bets.mr_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderReboundOUX(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Rebound Over / Under X</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.reboundOverX.oldOdd && "Changed from " + props.match.bets.reboundOverX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Over"} mbn={props.match.bets.reboundOverX.MBN} odd={props.match.bets.reboundOverX.odd} id={props.match.bets.reboundOverX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.reboundUnderX.oldOdd && "Changed from " + props.match.bets.reboundUnderX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Under"} mbn={props.match.bets.reboundUnderX.MBN} odd={props.match.bets.reboundUnderX.odd} id={props.match.bets.reboundUnderX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderTotalScoreOUX(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Total Score Over / Under X</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.totalScoreOverX.oldOdd && "Changed from " + props.match.bets.totalScoreOverX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Over"} mbn={props.match.bets.totalScoreOverX.MBN} odd={props.match.bets.totalScoreOverX.odd} id={props.match.bets.totalScoreOverX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.totalScoreUnderX.oldOdd && "Changed from " + props.match.bets.totalScoreUnderX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Under"} mbn={props.match.bets.totalScoreUnderX.MBN} odd={props.match.bets.totalScoreUnderX.odd} id={props.match.bets.totalScoreUnderX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }


    return(
        <ExpansionPanel>
                    <ExpansionPanelSummary style={summaryStyling}>
                        <TableContainer><Table><TableHead><TableRow>
                            <TableCell style={{width:"30%"}}>{props.match.home}</TableCell>
                            <TableCell style={{width:"30%"}}>{props.match.away}</TableCell>
                            <TableCell style={{width:"18%"}}>{props.match.date}</TableCell>
                            <TableCell style={{width:"8%"}}>{props.match.vote}</TableCell>
                        </TableRow></TableHead></Table></TableContainer>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={detailStyling}>
                        <Grid container spacing={3}>
                            {renderMR()}
                            {renderReboundOUX()}
                            {renderTotalScoreOUX()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
    )

}

function RenderTennisMatchRow(props){
    function renderVote(){

        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Tooltip><Typography variant="subtitle2" color="initial">Vote for Winning Side!</Typography></Tooltip>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title="add"><TableCell style={cellStyle}><VoteCard text={"Home"} votes={props.match.votes.home}/></TableCell></Tooltip>
                    <TableCell style={cellStyle}><VoteCard text={"Draw"} votes={props.match.votes.draw}/></TableCell>
                    <TableCell style={cellStyle}><VoteCard text={"Away"} votes={props.match.votes.away}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderMR(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        console.log("ms1 mbn:", props.match.bets.mr_one.MBN)
        console.log("akjsdhaksjdh")
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.mr_one.oldOdd && "Changed from " + props.match.bets.mr_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Home"} mbn={props.match.bets.mr_one.MBN} odd={props.match.bets.mr_one.odd} id={props.match.bets.mr_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_two.oldOdd && "Changed from " + props.match.bets.mr_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Away"} mbn={props.match.bets.mr_two.MBN} odd={props.match.bets.mr_two.odd} id={props.match.bets.mr_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderFirstSet(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">First Set Winner</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.firstSetHome.oldOdd && "Changed from " + props.match.bets.firstSetHome.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Home"} mbn={props.match.bets.firstSetHome.MBN} odd={props.match.bets.firstSetHome.odd} id={props.match.bets.firstSetHome.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.firstSetAway.oldOdd && "Changed from " + props.match.bets.firstSetAway.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Away"} mbn={props.match.bets.firstSetAway.MBN} odd={props.match.bets.firstSetAway.odd} id={props.match.bets.firstSetAway.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderSecondSet(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Second Set Winner</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.secondSetHome.oldOdd && "Changed from " + props.match.bets.secondSetHome.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Home"} mbn={props.match.bets.secondSetHome.MBN} odd={props.match.bets.secondSetHome.odd} id={props.match.bets.secondSetHome.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.secondSetAway.oldOdd && "Changed from " + props.match.bets.secondSetAway.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Away"} mbn={props.match.bets.secondSetAway.MBN} odd={props.match.bets.secondSetAway.odd} id={props.match.bets.secondSetAway.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }


    return(
        <ExpansionPanel>
                    <ExpansionPanelSummary style={summaryStyling}>
                        <TableContainer><Table><TableHead><TableRow>
                            <TableCell style={{width:"30%"}}>{props.match.home}</TableCell>
                            <TableCell style={{width:"30%"}}>{props.match.away}</TableCell>
                            <TableCell style={{width:"18%"}}>{props.match.date}</TableCell>
                            <TableCell style={{width:"8%"}}>{props.match.vote}</TableCell>
                        </TableRow></TableHead></Table></TableContainer>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={detailStyling}>
                        <Grid container spacing={3}>
                            {renderMR()}
                            {renderFirstSet()}
                            {renderSecondSet()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
    )

}

function RenderFootballMatchRow(props){
    
    function renderVote(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Tooltip><Typography variant="subtitle2" color="initial">Vote for Winning Side!</Typography></Tooltip>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title="add"><TableCell style={cellStyle}><VoteCard text={"Home"} votes={props.match.votes.home}/></TableCell></Tooltip>
                    <TableCell style={cellStyle}><VoteCard text={"Draw"} votes={props.match.votes.draw}/></TableCell>
                    <TableCell style={cellStyle}><VoteCard text={"Away"} votes={props.match.votes.away}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    
    function renderMR(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.mr_one.oldOdd && "Changed from " + props.match.bets.mr_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Home"} mbn={props.match.bets.mr_one.MBN} odd={props.match.bets.mr_one.odd} id={props.match.bets.mr_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_two.oldOdd && "Changed from " + props.match.bets.mr_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Away"} mbn={props.match.bets.mr_two.MBN} odd={props.match.bets.mr_two.odd} id={props.match.bets.mr_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_draw.oldOdd && "Changed from " + props.match.bets.mr_draw.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Draw"} mbn={props.match.bets.mr_draw.MBN} odd={props.match.bets.mr_draw.odd} id={props.match.bets.mr_draw.bet_id} match_id={props.match.match_id} handleBet={props.handleBet} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderFHMR(){

        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">First Half - Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow>
                <Tooltip title={props.match.bets.one_one.oldOdd && "Changed from " + props.match.bets.one_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"1/1"} mbn={props.match.bets.one_one.MBN} odd={props.match.bets.one_one.odd} id={props.match.bets.one_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.one_two.oldOdd && "Changed from " + props.match.bets.one_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"1/2"} mbn={props.match.bets.one_two.MBN} odd={props.match.bets.one_two.odd} id={props.match.bets.one_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.one_zero.oldOdd && "Changed from " + props.match.bets.one_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"1/X"} mbn={props.match.bets.one_zero.MBN} odd={props.match.bets.one_zero.odd} id={props.match.bets.one_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow>
                <Tooltip title={props.match.bets.zero_one.oldOdd && "Changed from " + props.match.bets.zero_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"X/1"} mbn={props.match.bets.zero_one.MBN} odd={props.match.bets.zero_one.odd} id={props.match.bets.zero_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.zero_two.oldOdd && "Changed from " + props.match.bets.zero_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"X/2"} mbn={props.match.bets.zero_two.MBN} odd={props.match.bets.zero_two.odd} id={props.match.bets.zero_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.zero_zero.oldOdd && "Changed from " + props.match.bets.zero_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"X/X"} mbn={props.match.bets.zero_zero.MBN} odd={props.match.bets.zero_zero.odd} id={props.match.bets.zero_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
                <Tooltip title={props.match.bets.two_one.oldOdd && "Changed from " + props.match.bets.two_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"2/1"} mbn={props.match.bets.two_one.MBN} odd={props.match.bets.two_one.odd} id={props.match.bets.two_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.two_two.oldOdd && "Changed from " + props.match.bets.two_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"2/2"} mbn={props.match.bets.two_two.MBN} odd={props.match.bets.two_two.odd} id={props.match.bets.two_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.two_zero.oldOdd && "Changed from " + props.match.bets.two_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"2/X"} mbn={props.match.bets.two_zero.MBN} odd={props.match.bets.two_zero.odd} id={props.match.bets.two_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    function renderOU2_5(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Over / Under 2.5</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.over_2_5.oldOdd && "Changed from " + props.match.bets.over_2_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Over"} mbn={props.match.bets.over_2_5.MBN} odd={props.match.bets.over_2_5.odd} id={props.match.bets.over_2_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.under_2_5.oldOdd && "Changed from " + props.match.bets.under_2_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Under"} mbn={props.match.bets.under_2_5.MBN} odd={props.match.bets.under_2_5.odd} id={props.match.bets.under_2_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    function renderRedCount(){
         const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Red Card Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.redCardCount_0.oldOdd && "Changed from " + props.match.bets.redCardCount_0.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"0"} mbn={props.match.bets.redCardCount_0.MBN} odd={props.match.bets.redCardCount_0.odd} id={props.match.bets.redCardCount_0.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.redCardCount_1.oldOdd && "Changed from " + props.match.bets.redCardCount_1.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"1"} mbn={props.match.bets.redCardCount_1.MBN} odd={props.match.bets.redCardCount_1.odd} id={props.match.bets.redCardCount_1.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderYellowCount(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Corner Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.yellowCardCount_0.oldOdd && "Changed from " + props.match.bets.yellowCardCount_0.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"0"} mbn={props.match.bets.yellowCardCount_0.MBN} odd={props.match.bets.yellowCardCount_0.odd} id={props.match.bets.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.yellowCardCount_1.oldOdd && "Changed from " + props.match.bets.yellowCardCount_1.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1"} mbn={props.match.bets.yellowCardCount_1.MBN} odd={props.match.bets.yellowCardCount_1.odd} id={props.match.bets.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderCornerCount(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Corner Count Over / Under 7.5</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.cornerCountOver_7_5.oldOdd && "Changed from " + props.match.bets.cornerCountOver_7_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Over 7.5"} mbn={props.match.bets.cornerCountOver_7_5.MBN} odd={props.match.bets.cornerCountOver_7_5.odd} id={props.match.bets.cornerCountOver_7_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.cornerCountUnder_7_5.oldOdd && "Changed from " + props.match.bets.cornerCountUnder_7_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard match_id={props.match.match_id} text={"Under 7.5"} mbn={props.match.bets.cornerCountUnder_7_5.MBN} odd={props.match.bets.cornerCountUnder_7_5.odd} id={props.match.bets.cornerCountUnder_7_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    return(
        <ExpansionPanel>
                    <ExpansionPanelSummary style={summaryStyling}>
                        <TableContainer><Table><TableHead><TableRow>
                            <TableCell style={{width:"30%"}}>{props.match.home}</TableCell>
                            <TableCell style={{width:"30%"}}>{props.match.away}</TableCell>
                            <TableCell style={{width:"18%"}}>{props.match.date}</TableCell>
                            <TableCell style={{width:"8%"}}>{props.match.vote}</TableCell>
                        </TableRow></TableHead></Table></TableContainer>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={detailStyling}>
                        <Grid container spacing={3}>
                            {renderMR()}
                            {renderFHMR()}
                            {renderOU2_5()}
                            {renderRedCount()}
                            {renderCornerCount()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
    );
}

function RenderTitles(){
    const containerStyle = {
        padding: 12,
    }
    return(
    <Paper>
        <TableContainer><Table style={containerStyle}><TableHead> <TableRow>
            <TableCell style={{width:"30%"}}>Home</TableCell>
            <TableCell style={{width:"30%"}}>Away</TableCell>
            <TableCell style={{width:"18%"}}>Date</TableCell>
            <TableCell style={{width:"8%"}}>Vote</TableCell>
        </TableRow></TableHead></Table></TableContainer>
    </Paper>
    );
}

class BetsPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedSport: "FOOTBALL",
        }
    }


    render(){

        console.log("selected",this.props.selectedSport)
        switch (this.props.selectedSport) {
            case "FOOTBALL":
                var rows =
                    <Paper style={{padding: 15,}} elevation={7}>
                        <RenderTitles/>
                        {this.props.matches.map( match => {
                            console.log("match", match)
                        return(
                            <RenderFootballMatchRow match={match} handleBet={this.props.handleBet}/> ) } ) }
                    </Paper>
                        break;
            case "BASKETBALL":
                var rows =
                    <Paper style={{padding: 15,}} elevation={7}>
                        <RenderTitles/>
                        {this.props.matches.map( match => {
                        return(
                            <RenderBasketballMatchRow match={match} handleBet={this.props.handleBet}/> ) } ) }
                    </Paper>
                        break;
            case "TENNIS":
                var rows =
                    <Paper style={{padding: 15,}} elevation={7}>
                        <RenderTitles/>
                    {this.props.matches .map( match => {
                        return(
                            <RenderTennisMatchRow match={match} handleBet={this.props.handleBet}/> ) } ) }
                    </Paper>
                        break;
            default:
                break;
            }
            return rows;
        }
    }

const contests = [
    { name: "Champions League", type:"FOOTBALL" },
    { name: "Premier League", type: "FOOTBALL"},
    { name: "Turkish Super League", type: "FOOTBALL"},
    { name: "Bundesliga", type: "FOOTBALL" },
    { name: "NBA", type: "BASKETBALL"},
    { name: "Euro League", type: "BASKETBALL"}
  ]

  class AdminChangeBet extends Component{

    constructor(props) {
        super(props)
        this.state = {
          matches: [],
          inputText: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeInputText = this.changeInputText.bind(this)
        this.resetMatches = this.resetMatches.bind(this)
      }

    changeInputText(text){
        this.setState({
          inputText: text
        })
      }
    
    resetMatches() {
        this.setState({
          matches: []
        })
      }

    handleSubmit() {
        var temp = []
        this.setState({
          matches: []
        })
        console.log( "sport_name", this.props.filterInfo.sport,
        "max_mbn", this.props.filterInfo.mbn,
        "contest", this.props.filterInfo.contest,
        "sort_type", "popularity",
        "search_text", this.state.inputText)
        axios.post(URL,
          {
            "username": "",
            "request_type": "filter",
            "played_amount": "",
            "match_id": "",
            "bet_id": "",
            "editor_comment": "",
            "vote_side": "",
            "filter": {
                "sport_name": this.props.filterInfo.sport,
                "max_mbn": this.props.filterInfo.mbn,
                "contest": "",
                "sort_type": "popularity",
                "search_text": this.state.inputText
            }
         })
          .then( res => {
              console.log("result is: ", res.data)
              if (this.props.filterInfo.sport == "FOOTBALL") {
                for (var i = 0; i < res.data.matches.length; i++ ) {
                  var match = {home: "", away: "", bets: { mr_one: {},
                                                      mr_draw         : {},
                                                      mr_two          : {},
                                                      over_2_5        : {},
                                                      under_2_5       : {},
                                                      one_one         :{},
                                                      one_zero        :{},
                                                      one_two         :{},
                                                      zero_one        : {},
                                                      zero_zero       : {},
                                                      zero_two        : {},
                                                      two_one         : {},
                                                      two_zero        : {},
                                                      two_two         : {},
                                                      redCardCount_0  :{},
                                                      redCardCount_1  :{},
                                                      cornerCountOver_7_5  :{},
                                                      cornerCountUnder_7_5 :{},
                                                }, match_id: ""};
    
                  match.home = res.data.matches[i].bets[0].home_side;
                  match.away = res.data.matches[i].bets[0].away_side;
                  match.match_id = res.data.matches[i].match_id
                  
                  for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                    var type = res.data.matches[i].bets[j].bet_type;
                    switch(type) {
                      case "mr_one":
                         match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "mr_two":
                         match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
                      case "over_2_5":
                         match.bets.over_2_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
                      case "under_2_5":
                         match.bets.under_2_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd, 
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "one_one":
                         match.bets.one_one = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "one_zero":
                         match.bets.one_two = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "zero_one":
                         match.bets.zero_one = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "zero_zero":
                         match.bets.zero_zero = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "zero_two":
                         match.bets.zero_two = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
    
                      case "two_zero":
                         match.bets.two_zero = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "two_one":
                         match.bets.two_one = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "two_two":
                         match.bets.two_two = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "red_card_count_0":
                         match.bets.redCardCount_0 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
    
                      case "red_card_count_1":
                         match.bets.redCardCount_1 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "corner_count_over_7_5":
                         match.bets.cornerCountOver_7_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                         break;
    
                      case "corner_count_under_7_5":
                         match.bets.cornerCountUnder_7_5 = { MBN: res.data.matches[i].bets[j].mbn,
                                          odd:res.data.matches[i].bets[j].odd,
                                          oldOdd: res.data.matches[i].bets[j].old_odd,
                                          bet_id: res.data.matches[i].bets[j].bet_id};
                          break;
                      default: break;
                  }
                }
                temp[i] = match
              }
            }
            if (this.props.filterInfo.sport == "BASKETBALL") {
              for (var i = 0; i < res.data.matches.length; i++ ) {
                var match = {home: "", away: "", bets: { mr_one: {},
                mr_two          : {},
                reboundOverX    : {},
                reboundUnderX   : {},
                totalScoreOverX: {},
                totalScoreUnderX: {},
                } };
                match.home = res.data.matches[i].bets[0].home_side;
                match.away = res.data.matches[i].bets[0].away_side;
  
                for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                  var type = res.data.matches[i].bets[j].bet_type;
                  switch(type) {
                    case "mr_one":
                       match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd};
                        break;
  
                    case "mr_two":
                       match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd};
                        break;
                    case "rebound_over_x":
                        match.bets.reboundOverX = {MBN: res.data.matches[i].bets[j].mbn,
                                            odd:res.data.matches[i].bets[j].odd,
                                            oldOdd: res.data.matches[i].bets[j].old_odd}
                        break;
                    case "rebound_under_x":
                        match.bets.reboundUnderX = {MBN: res.data.matches[i].bets[j].mbn,
                          odd:res.data.matches[i].bets[j].odd,
                          oldOdd: res.data.matches[i].bets[j].old_odd}
                        break;
                    case "total_score_over_x":
                      match.bets.totalScoreOverX = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                    case "total_score_under_x":
                      match.bets.totalScoreUnderX = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                    default: break;
                }
              }
              temp[i] = match
              }
            }
  
            if (this.props.filterInfo.sport == "TENNIS") {
              for (var i = 0; i < res.data.matches.length; i++ ) {
                var match = {home: "", away: "", bets: 
                { mr_one        : {},
                mr_two          : {},
                firstSetHome    : {},
                firstSetAway    : {},
                secondSetHome   : {},
                secondSetAway   : {},
                } };
                match.home = res.data.matches[i].bets[0].home_side;
                match.away = res.data.matches[i].bets[0].away_side;
  
                for( var j = 0; j < res.data.matches[i].bets.length; j++) {
                  var type = res.data.matches[i].bets[j].bet_type;
                  switch(type) {
                    case "mr_one":
                       match.bets.mr_one = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd};
                        break;
  
                    case "mr_two":
                       match.bets.mr_two = { MBN: res.data.matches[i].bets[j].mbn,
                                        odd:res.data.matches[i].bets[j].odd,
                                        oldOdd: res.data.matches[i].bets[j].old_odd};
                        break;
                    case "first_set_home":
                        match.bets.firstSetHome = {MBN: res.data.matches[i].bets[j].mbn,
                                            odd:res.data.matches[i].bets[j].odd,
                                            oldOdd: res.data.matches[i].bets[j].old_odd}
                        break;
                    case "first_set_away":
                        match.bets.firstSetAway = {MBN: res.data.matches[i].bets[j].mbn,
                          odd:res.data.matches[i].bets[j].odd,
                          oldOdd: res.data.matches[i].bets[j].old_odd}
                        break;
                    case "second_set_home":
                      match.bets.secondSetHome = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                    case "second_set_away":
                      match.bets.secondSetAway = {MBN: res.data.matches[i].bets[j].mbn,
                        odd:res.data.matches[i].bets[j].odd,
                        oldOdd: res.data.matches[i].bets[j].old_odd}
                      break;
                    default: break;
                }
              }
              temp[i] = match
              }
            }
  
            this.setState({
              matches: temp
            })
          })
           .catch(error => {
              console.log("login", error);
              });
      }

    render(){
        
        return (
        <UserContext.Consumer>
        { ( {username, balance, updateBalance, loggedIn, betsInfo, updateBetsInfo, selectedSport, updateSelectedSport, alphaCoins} ) => (
            <Box style={{width: "100%"}}>
                <FilterPanel inputText={this.state.inputText} onInputChange={this.changeInputText} contests={contests} 
                filterInfo = {this.props.filterInfo} updateFilterInfo = {this.props.updateFilterInfo} 
                updateBetsInfo={updateBetsInfo} handleSubmit={this.handleSubmit} resetMatches = {this.resetMatches}/>
                <BetsPanel  matches={this.state.matches} betsInfo={betsInfo} selectedSport={this.props.filterInfo.sport}/>
            </Box>
        )}
        </UserContext.Consumer>);
    }
  }

  export default AdminChangeBet