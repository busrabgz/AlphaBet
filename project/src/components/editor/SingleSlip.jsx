import React, { Component } from 'react';
import {Grid, Box, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions} from '@material-ui/core';
import axios from 'axios';

const URL = "http://localhost:5000/feed";

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
        this.userLikeBetSlip = this.userLikeBetSlip.bind(this);
        this.commentOnBetSlip = this.commentOnBetSlip.bind(this);
        this.changeText = this.changeText.bind(this)
        this.state={
          comments: this.props.slip.comments === undefined ? [{
            "comment": "No comments has been made",
            "comment_id": "",
            "comment_like_count": "",
            "username": ""
          }] : this.props.slip.comments,
          likeCount: this.props.slip.bet_slip_like_count == undefined ? "0" : this.props.slip.bet_slip_like_count,
          bet_slip_id: this.props.slip.bet_slip_id,
          updated: "false",
          commentOn: false,
          comment: "",
        }
        this.totalOdd = 1;

        for(var i=0; i < this.props.slip.bets.length; i++){
            this.totalOdd = this.totalOdd * this.props.slip.bets[i].odd;
        }
     }

      changeText(event){
        this.setState({
          [event.target.id]: event.target.value,
        })
      }

  commentOnBetSlip(){
    if(this.props.userSuccess){
      axios.post(URL,
        {
          "user_id": this.props.id,
          "request_type": "comment_on_bet_slip",
          "comment_text": this.state.comment,
          "focused_bet_slip_id": this.state.bet_slip_id
        },
        {withCredentials: false})
        .then( res => {
          console.log("res is: ", res.data)
          if(res.data.status == "success"){
            this.setState({updated: this.state.updated == "true" ? "false" : "true",
                            commentOn: false
            })
            this.props.updateFriends()

          }
          else
            console.log("already liked")
        })
        .catch( (error) => {
          console.log("info", error)
        });
    }
  }


  userLikeBetSlip(){
    if(this.props.userSuccess){
      axios.post(URL,
        {
          "user_id": this.props.id,
          "request_type": "user_like_bet_slip",
          "comment_text": "",
          "focused_bet_slip_id": this.state.bet_slip_id
        },
        {withCredentials: false})
        .then( res => {
          if(res.data.success == "false")
            console.log("already liked")
          else
              this.setState({
                updated: this.state.updated === "true" ? "false" : "true",
            })
            this.props.updateFriends()
        })
        .catch( (error) => {
          console.log("info", error)
        });
    }
  }

    render(){
        return (
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Paper>
                    <Paper style={buttonPaperStyle} elevation={10}>
                        <Button onClick={this.userLikeBetSlip} style={{color: "white", backgroundColor: "#FC498A", float:"left", width:"50%"}}>LIKE ({this.state.likeCount})</Button>
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
                        <Button onClick={() => this.props.handleBetChange(this.props.slip.bet_slip_id)} style={{border: "solid 0.8px", marginTop:20, backgroundColor:"#14FF43", float:"center", width:"100%"}}>BET ON THIS NOW!</Button>
                    </Paper>
                    <Paper style={outerPaperStyle} elevation={10}>
                        <Typography align="left" variant="h5" color="initial"> Comments </Typography>
                        <RenderComments comments={this.state.comments}/>
                        <form>
                            <TextField id="comment" label="Enter Comment" type="comment"value={this.state.comment} onChange={this.changeText} placeholder="Your comment here"></TextField>
                            <Button onClick={this.commentOnBetSlip} style={{color: "white", backgroundColor: "#49AEFC", align: "right",}}>ADD COMMENT</Button>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        );
    }
}

export default SingleSlip