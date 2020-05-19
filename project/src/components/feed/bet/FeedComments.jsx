import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {UserContext} from '../../user-context';
import Avatar from '@material-ui/core/Avatar';
import likeIcon from './like.png';
import avatarIcon from './avatar.png';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

  render() {
    return (
        <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableBody>
                    <TableRow>
                      <TableCell style={{width: '5%'}} align="right"><Avatar style={iconStyle} src={likeIcon}/></TableCell>
                      <TableCell align="left"><p>x people liked this</p></TableCell>
                      <TableCell style={{width: '10%'}} align="left"><Button style={{color: "white", backgroundColor: "#49AEFC"}} src={likeIcon}>COMMENT</Button></TableCell>
                      <TableCell style={{width: '10%'}} align="left"><Button style={{color: "white", backgroundColor: "#FC498A"}} src={likeIcon}>LIKE</Button></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              <Table aria-label="customized table">
                <TableBody>
                    <TableRow>
                      <TableCell style={{width: '5%'}}align="right"><Avatar style={iconStyle} src={avatarIcon}/></TableCell>
                      <TableCell align="left"> <p>username said:</p></TableCell>
                      <TableCell style={{width: '80%'}}align="left"><p>Comment</p></TableCell>
                      <TableCell style={{width: '10%'}}align="left"><Button style={{color: "white", bottom: 20, backgroundColor: "#FC498A"}}>Like</Button></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

        </div>
  )}
}

export default FeedComments