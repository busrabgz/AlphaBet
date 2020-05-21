import React, { Component } from 'react';
import {Grid, Box, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions} from '@material-ui/core';

const outerPaperStyle = {
    border: "solid 1.2px",
    minHeight: "100",
    padding: 40,
}

const buttonPaperStyle = {
    border: "solid 1.2px",
    minHeight: 40, 
    padding:10,
}

const innerPaperStyle = {
    border: "solid 1.2px",
    minHeight: "100",
    padding: 40,
}

const betStyle = {
    border: "solid 0.8px",
    minHeight: "120",
    padding: 10,
}

function RenderBets(props){
    return(
        props.bets.map((bet) => {
            return(
                <Paper style={betStyle}>
                    <p>{bet.home_side + "-" + bet.away_side}</p>
                    <p>{"Bet:" + bet.bet_type + "  Odd: " + bet.odd}</p>
                </Paper>
        )})
    );
}

function RenderComments(props){
    return(
        props.comments.map((comment) => {
            return(
            <Paper style={{minHeight: 40, padding: 10, border: "0.5px solid"}}>
                <Box style={{float:"left"}}><Typography variant="h7" color="initial">{comment.username + " says: \n"}</Typography></Box>
                <Box style={{float:"center"}}><Typography variant="subtitle" color="initial">{comment.comment}</Typography></Box>
                <Box style={{float:"right"}}><Button style={{color: "white", bottom: 20, backgroundColor: "#FC498A"}}>Like ({comment.comment_like_count})</Button></Box>
            </Paper>
        )})
    );
}


class SingleSlip extends Component {
    constructor(props) {
        super(props);
        this.totalOdd = 1;

        for(var i=0; i < this.props.slip.bets.length; i++){
            this.totalOdd = this.totalOdd * this.props.slip.bets[i].odd;
        }
     }

    render(){
        return (
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Paper>
                    <Paper style={buttonPaperStyle} elevation={10}>
                        <Button style={{color: "white", backgroundColor: "#FC498A", float:"left", width:"50%"}}>LIKE ({this.props.slip.bet_slip_like_count})</Button>
                        <Button style={{color: "white", backgroundColor: "#49AEFC", float:"right", width:"50%"}}>SHARE</Button>
                    </Paper>
                    <Paper style={outerPaperStyle} elevation={10}>
                        Bet Slip With Total Odd {this.totalOdd}
                    </Paper>
                    <Paper style={innerPaperStyle} elevation={10}>
                        <RenderBets bets={this.props.slip.bets}/>
                        <Paper style style={betStyle}>
                            Total odd : {this.totalOdd}
                        </Paper>
                        <Button style={{border: "solid 0.8px", marginTop:20, backgroundColor:"#14FF43", float:"center", width:"100%"}}>BET ON THIS NOW!</Button>
                    </Paper>
                    <Paper style={outerPaperStyle} elevation={10}>
                        <Typography align="left" variant="h5" color="initial"> Comments </Typography>
                        <RenderComments comments={this.props.slip.comments}/>
                        <form>
                            <TextField placeholder="Your comment here"></TextField>
                            <Button style={{color: "white", backgroundColor: "#49AEFC", align: "right",}}>ADD COMMENT</Button>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        );
    }
}

export default SingleSlip