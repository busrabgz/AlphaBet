import React, {Component} from 'react'
import { Button, Card, Typography, Grid, TableBody, Table, TableContainer, Paper, TableHead, TableCell, TableRow, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Collapse, CardContent, CardActions, Tooltip } from '@material-ui/core'

const summaryStyling = {
    height: 40,
}
const detailStyling = {
    border: "solid 1px",
}

function ActionCard(props){
    const contentStyle = {
        padding: 0, margin: 0,
    }

    const buttonStyle = {
    }
    console.log(props.mbn)
    return(
    <Card style={{ height: 40, display: "inline-flex", overflowX: "hidden"}}>
        <CardContent style={contentStyle}>
            <Typography style={{fontSize: 12, paddingLeft: 6, paddingTop: 6,}} color="primary" gutterBottom>
                {props.text + " - MBN: " + props.mbn + " Odd: " + props.odd}
            </Typography>
        </CardContent>
        <CardActions style={contentStyle}>
            <Button style={buttonStyle} onClick={() => props.handleBet(props.id, props.match_id)}>Bet
            </Button>
        </CardActions>
    </Card>
    );
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
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Match Result</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.mr_one.oldOdd && "Changed from " + props.match.bets.mr_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Home"} mbn={props.match.bets.mr_one.MBN} odd={props.match.bets.mr_one.odd} id={props.match.bets.mr_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_two.oldOdd && "Changed from " + props.match.bets.mr_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Away"} mbn={props.match.bets.mr_two.MBN} odd={props.match.bets.mr_two.odd} id={props.match.bets.mr_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.mr_zero.oldOdd && "Changed from " + props.match.bets.mr_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Draw"} mbn={props.match.bets.mr_zero.MBN} odd={props.match.bets.mr_zero.odd} id={props.match.bets.mr_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderReboundOUX(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Rebound Over / Under X</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.reboundOverX.oldOdd && "Changed from " + props.match.bets.reboundOverX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Over"} mbn={props.match.bets.reboundOverX.MBN} odd={props.match.bets.reboundOverX.odd} id={props.match.bets.reboundOverX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.reboundUnderX.oldOdd && "Changed from " + props.match.bets.reboundUnderX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Under"} mbn={props.match.bets.reboundUnderX.MBN} odd={props.match.bets.reboundUnderX.odd} id={props.match.bets.reboundUnderX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderTotalScoreOUX(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Total Score Over / Under X</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.totalScoreOverX.oldOdd && "Changed from " + props.match.bets.totalScoreOverX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Over"} mbn={props.match.bets.totalScoreOverX.MBN} odd={props.match.bets.totalScoreOverX.odd} id={props.match.bets.totalScoreOverX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                <Tooltip title={props.match.bets.totalScoreUnderX.oldOdd && "Changed from " + props.match.bets.totalScoreUnderX.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Under"} mbn={props.match.bets.totalScoreUnderX.MBN} odd={props.match.bets.totalScoreUnderX.odd} id={props.match.bets.totalScoreUnderX.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
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
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
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
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
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
            <Grid item lg={6} md={6} sm={12} xs={12}><Paper elevation={4}> 
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
                {typeof props.match.bets.one_one !== "undefined" && 
                <Tooltip title={props.match.bets.one_one.oldOdd && "Changed from " + props.match.bets.one_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1/1"} mbn={props.match.bets.one_one.MBN} odd={props.match.bets.one_one.odd} id={props.match.bets.one_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}

                {props.match.bets.one_two != undefined && 
                <Tooltip title={props.match.bets.one_two.oldOdd && "Changed from " + props.match.bets.one_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1/2"} mbn={props.match.bets.one_two.MBN} odd={props.match.bets.one_two.odd} id={props.match.bets.one_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                {props.match.bets.one_zero != {} && 
                <Tooltip title={props.match.bets.one_zero.oldOdd && "Changed from " + props.match.bets.one_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1/X"} mbn={props.match.bets.one_zero.MBN} odd={props.match.bets.one_zero.odd} id={props.match.bets.one_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                </TableRow>
                <TableRow>
                {props.match.bets.zero_one != {} &&  
                <Tooltip title={props.match.bets.zero_one.oldOdd && "Changed from " + props.match.bets.zero_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"X/1"} mbn={props.match.bets.zero_one.MBN} odd={props.match.bets.zero_one.odd} id={props.match.bets.zero_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                {props.match.bets.zero_two != {} &&  
                <Tooltip title={props.match.bets.zero_two.oldOdd && "Changed from " + props.match.bets.zero_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"X/2"} mbn={props.match.bets.zero_two.MBN} odd={props.match.bets.zero_two.odd} id={props.match.bets.zero_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                {props.match.bets.zero_zero != {} &&  
                <Tooltip title={props.match.bets.zero_zero.oldOdd && "Changed from " + props.match.bets.zero_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"X/X"} mbn={props.match.bets.zero_zero.MBN} odd={props.match.bets.zero_zero.odd} id={props.match.bets.zero_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                </TableRow>
                <TableRow> 
                {props.match.bets.two_one != {} &&  
                <Tooltip title={props.match.bets.two_one.oldOdd && "Changed from " + props.match.bets.two_one.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"2/1"} mbn={props.match.bets.two_one.MBN} odd={props.match.bets.two_one.odd} id={props.match.bets.two_one.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                {props.match.bets.two_two != {} &&  
                <Tooltip title={props.match.bets.two_two.oldOdd && "Changed from " + props.match.bets.two_two.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"2/2"} mbn={props.match.bets.two_two.MBN} odd={props.match.bets.two_two.odd} id={props.match.bets.two_two.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
                {props.match.bets.two_zero != {} &&  
                <Tooltip title={props.match.bets.two_zero.oldOdd && "Changed from " + props.match.bets.two_zero.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"2/X"} mbn={props.match.bets.two_zero.MBN} odd={props.match.bets.two_zero.odd} id={props.match.bets.two_zero.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>}
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
                    <TableCell style={cellStyle}><ActionCard text={"Over"} mbn={props.match.bets.over_2_5.MBN} odd={props.match.bets.over_2_5.odd} id={props.match.bets.over_2_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
                <Tooltip title={props.match.bets.under_2_5.oldOdd && "Changed from " + props.match.bets.under_2_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Under"} mbn={props.match.bets.under_2_5.MBN} odd={props.match.bets.under_2_5.odd} id={props.match.bets.under_2_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
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
                    <TableCell style={cellStyle}><ActionCard text={"0"} mbn={props.match.bets.redCardCount_0.MBN} odd={props.match.bets.redCardCount_0.odd} id={props.match.bets.redCardCount_0.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
                <Tooltip title={props.match.bets.redCardCount_1.oldOdd && "Changed from " + props.match.bets.redCardCount_1.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1"} mbn={props.match.bets.redCardCount_1.MBN} odd={props.match.bets.redCardCount_1.odd} id={props.match.bets.redCardCount_1.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
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
                </TableRow>
                <TableRow> 
                <Tooltip title={props.match.bets.yellowCardCount_1.oldOdd && "Changed from " + props.match.bets.yellowCardCount_1.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"1"} mbn={props.match.bets.yellowCardCount_1.MBN} odd={props.match.bets.yellowCardCount_1.odd} id={props.match.bets.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
                </TableRow></TableBody></Table></TableContainer></Paper></Grid>
        );
    }

    function renderCornerCount(){
        const cellStyle={
            padding: '0px 0px 0px 0px',
        }
        return(
            <Grid item lg={12} md={12} sm={12} xs={12}><Paper elevation={4}> 
            <Typography variant="subtitle2" color="initial">Yellow Card Count</Typography>
            <TableContainer><Table><TableBody>
                <TableRow> 
                <Tooltip title={props.match.bets.cornerCountOver_7_5.oldOdd && "Changed from " + props.match.bets.cornerCountOver_7_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Over 7.5"} mbn={props.match.bets.cornerCountOver_7_5.MBN} odd={props.match.bets.cornerCountOver_7_5.odd} id={props.match.bets.cornerCountOver_7_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
                </Tooltip>
                </TableRow>
                <TableRow> 
                <Tooltip title={props.match.bets.cornerCountUnder_7_5.oldOdd && "Changed from " + props.match.bets.cornerCountUnder_7_5.oldOdd}>
                    <TableCell style={cellStyle}><ActionCard text={"Under 7.5"} mbn={props.match.bets.cornerCountUnder_7_5.MBN} odd={props.match.bets.cornerCountUnder_7_5.odd} id={props.match.bets.cornerCountUnder_7_5.bet_id} match_id={props.match.match_id} handleBet={props.handleBet}/></TableCell>
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
                            {console.log("asdasd"), renderMR()}
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

export default BetsPanel