import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import likeIcon from './like.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';


const URL = "http://localhost:5000/feed";

const compStyle = {
  display : 'inline-block',
  width: "100%",
  height: 50,
};

const iconStyle = {
    border: "solid #000000",
    marginLeft: '10',
    verticalAlign: "center",
    width: 25,
    height: 25,
    float: "left",
    display : 'inline-block',
};


class FeedComments extends Component {
  constructor(props){
    super(props)
    this.userLikeBetSlip = this.userLikeBetSlip.bind(this)
    this.commentOnBetSlip = this.commentOnBetSlip.bind(this)
    this.openComment = this.openComment.bind(this)
    this.closeComment = this.closeComment.bind(this)
    this.changeText = this.changeText.bind(this)
    this.state={
      comments: this.props.comments === undefined ? [{
        "comment": "No comments has been made",
        "comment_id": "",
        "comment_like_count": "",
        "username": ""
      }] : this.props.comments,
      likeCount: this.props.likeCount == undefined ? "0" : this.props.likeCount,
      bet_slip_id: this.props.bet_slip,
      updated: "false",
      commentOn: false,
      comment: "",
    }
  }

  componentDidMount(){
    this.setState({
      comments: this.props.comments === undefined ? [{
        "comment": "No comments has been made",
        "comment_id": "",
        "comment_like_count": "",
        "username": ""
      }] : this.props.comments,
      bet_slip_id: this.props.bet_slip_id,
      likeCount: this.props.likeCount == undefined ? "0" : this.props.likeCount
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.updated != this.state.updated){
      this.setState({
        likeCount: this.props.likeCount == undefined ? "0" : this.props.likeCount
      })
    }

    if(prevProps.comments != this.props.comments){
      this.setState({
        comments: this.props.comments == undefined ? [{
          "comment": "No comments has been made",
          "comment_id": "",
          "comment_like_count": "",
          "username": ""
        }] : this.props.comments,
        bet_slip_id: this.props.bet_slip_id,
        likeCount: this.props.likeCount == undefined ? "0" : this.props.likeCount
      })
    } 
  }

  openComment(){
    this.setState({
      commentOn: true,
      comment: "",
    })
  }
  
  
  closeComment(){
    this.setState({
      commentOn: false,
      comment: "",
    })
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

  render() {
    return (
        <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableBody>
                    <TableRow>
                      <TableCell style={{width: '5%'}} align="right"><Avatar style={iconStyle} src={likeIcon}/></TableCell>
                      <TableCell align="left"><p>{this.state.likeCount} people liked this</p></TableCell>
                      <TableCell style={{width: '10%'}} align="left">
                        <Button onClick={this.openComment} style={{color: "white", backgroundColor: "#49AEFC"}} src={likeIcon}>COMMENT</Button>
                        <Dialog open={this.state.commentOn} onClose={this.closeComment} aria-labelledby="form-dialog-title">
                          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Write your comment and press submit to post.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="comment"
                              label="Enter Comment"
                              type="comment"
                              fullWidth
                              value={this.state.comment}
                              onChange={this.changeText}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.closeComment} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={this.commentOnBetSlip} color="primary">
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell style={{width: '10%'}} align="left"><Button onClick={this.userLikeBetSlip} style={{color: "white", backgroundColor: "#FC498A"}} src={likeIcon}>LIKE</Button></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              <Table aria-label="customized table">
                <TableBody>
                    {this.state.comments.map( comment => {
                      return(
                        <TableRow>
                          <TableCell style={{width: '20%'}}align="left"> <p>{comment.username}  {comment.username == "" ? "" : " said:"}</p></TableCell>
                          <TableCell style={{width: '60%'}}align="left"><p style={{fontStyle: "italic"}}>"{comment.comment}"</p></TableCell>
                          <TableCell style={{width: '10%'}}align="left">{comment.username == "" ? "" : <Button style={{color: "white", bottom: 20, backgroundColor: "#FC498A"}}>Like ({comment.comment_like_count})</Button>}</TableCell>
                        </TableRow>
                    )})}
                </TableBody>
              </Table>
            </TableContainer>

        </div>
  )}
}

export default FeedComments