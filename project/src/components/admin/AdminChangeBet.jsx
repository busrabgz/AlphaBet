import React, { Component } from 'react'
import NavBar from '../NavBar.jsx'
import {UserContext} from '../user-context';
import { Button, Card, Typography, Grid, TableBody, Table, TableContainer, Paper, TableHead, TableCell, TableRow, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Collapse, CardContent, CardActions, Tooltip, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Dialog } from '@material-ui/core'

const divStyle = {
    height: "calc(90% - 25em)",
    };
  
  const rootBoxStyle = {
      float: "left",
      width: "calc(95% - 25em)",
      marginLeft: "15px",
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

  function ActionCard(props){
    const contentStyle = {
        padding: 0, margin: 0,
    }

    const buttonStyle = {
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
    <Card style={{ height: 40, display: "inline-flex", overflowX: "hidden"}}>
        <CardContent style={contentStyle}>
            <Typography style={{fontSize: 12, paddingLeft: 6, paddingTop: 6,}} color="primary" gutterBottom>
                {props.text + " - MBN: " + props.mbn + " Odd: " + props.odd}
            </Typography>
        </CardContent>
        <CardActions style={contentStyle}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Modify
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Balance</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter new odd or disable the bet
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="newOdd"
                    label="Enter New Odd"
                    type="newOdd"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Confirm
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Disable Bet
                </Button>
                </DialogActions>
            </Dialog>
        </CardActions>
    </Card>
    );
}

function RenderMatchRow(props){

    function renderFHMR(){
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">First Half - Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                    <TableCell><ActionCard text={"1/1"} mbn={props.match.bets.one_one.MBN} odd={props.match.bets.one_one.odd}/></TableCell>
                    <TableCell><ActionCard text={"1/2"} mbn={props.match.bets.one_two.MBN} odd={props.match.bets.one_two.odd}/></TableCell>
                    <TableCell><ActionCard text={"1/X"} mbn={props.match.bets.one_zero.MBN} odd={props.match.bets.one_zero.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell><ActionCard text={"X/1"} mbn={props.match.bets.zero_one.MBN} odd={props.match.bets.zero_one.odd}/></TableCell>
                    <TableCell><ActionCard text={"X/2"} mbn={props.match.bets.zero_two.MBN} odd={props.match.bets.zero_two.odd}/></TableCell>
                    <TableCell><ActionCard text={"X/X"} mbn={props.match.bets.zero_zero.MBN} odd={props.match.bets.zero_zero.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell><ActionCard text={"2/1"} mbn={props.match.bets.two_one.MBN} odd={props.match.bets.two_one.odd}/></TableCell>
                    <TableCell><ActionCard text={"2/2"} mbn={props.match.bets.two_two.MBN} odd={props.match.bets.two_two.odd}/></TableCell>
                    <TableCell><ActionCard text={"2/X"} mbn={props.match.bets.two_zero.MBN} odd={props.match.bets.two_zero.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    function renderOU2_5(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Over / Under 2.5</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"Over"} mbn={props.match.bets.over_2_5.MBN} odd={props.match.bets.over_2_5.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"Under"} mbn={props.match.bets.under_2_5.MBN} odd={props.match.bets.under_2_5.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    function renderOU1_5(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Over / Under 1.5</Typography>
            <TableContainer><Table><TableBody>
                <TableRow>
                    <TableCell style={cellStyle}><ActionCard text={"Over"} mbn={props.match.bets.over_1_5.MBN} odd={props.match.bets.over_1_5.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"Under"} mbn={props.match.bets.under_1_5.MBN} odd={props.match.bets.under_1_5.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }
    function renderRedCount(){
         const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Red Card Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"0"} mbn={props.match.bets.redCardCount_0.MBN} odd={props.match.bets.redCardCount_0.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"1"} mbn={props.match.bets.redCardCount_1.MBN} odd={props.match.bets.redCardCount_1.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"2+"} mbn={props.match.bets.redCardCount_2.MBN} odd={props.match.bets.redCardCount_2.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderYellowCount(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Yellow Card Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"Over 7.5"} mbn={props.match.bets.cornerCountOver_7_5.MBN} odd={props.match.bets.cornerCountOver_7_5.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"Under 7.5"} mbn={props.match.bets.cornerCountUnder_7_5.MBN} odd={props.match.bets.cornerCountUnder_7_5.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderCornerCount(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Corner Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"0"} mbn={props.match.bets.yellowCardCount_0.MBN} odd={props.match.bets.yellowCardCount_0.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"1"} mbn={props.match.bets.yellowCardCount_1.MBN} odd={props.match.bets.yellowCardCount_1.odd}/></TableCell>
                </TableRow>
                <TableRow> 
                    <TableCell style={cellStyle}><ActionCard text={"2+"} mbn={props.match.bets.yellowCardCount_2.MBN} odd={props.match.bets.yellowCardCount_2.odd}/></TableCell>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    const summaryStyling = {
        height: 40,
    }
    const detailStyling = {
        border: "solid 1px",
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
                            {renderFHMR()}
                            {renderOU2_5()}
                            {renderOU1_5()}
                            {renderRedCount()}
                            {renderYellowCount()}
                            {renderCornerCount()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
    );
}
  class AdminChangeBet extends Component{

    render(){
        return (
            <Paper style={{padding: 15,}} elevation={7}>
                <RenderTitles/>
                {this.props.matches.map( (match) => {
                    return(
                        <RenderMatchRow match={match}/>
                );})}
            </Paper>
        )}
  }

  export default AdminChangeBet