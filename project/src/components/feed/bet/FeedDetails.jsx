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

const divStyle = {
  width: "100%",
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: "white",
}

class FeedDetails extends Component {

  render() {
    return (
        <div style={divStyle}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Matches</TableCell>
                    <TableCell align="right">Bets</TableCell>
                    <TableCell align="right">Odds</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell align="left">Real Madrid - Galatasaray</TableCell>
                      <TableCell align="right">MS-1</TableCell>
                      <TableCell align="right">1.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Beşiktaş - Galatasaray</TableCell>
                      <TableCell align="right">MS-1</TableCell>
                      <TableCell align="right">1.5</TableCell>
                    </TableRow>
                    <TableBody>
                      <TableCell>
                        <Button variant='contained' style={buttonStyle} >
                          Bet on this now!
                        </Button>
                      </TableCell>
                    </TableBody>
                </TableBody>
              </Table>
            </TableContainer>

        </div>
  )}
}

export default FeedDetails