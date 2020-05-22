import React, { Component } from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import SingleSlip from './SingleSlip'

class BetSlips extends Component {

    render(){
        return (
            <Grid container spacing={3}>
                {this.props.editor.bet_slips && this.props.editor.bet_slips.map( (single) => {
                        return(
                            <SingleSlip updateFriends = {this.props.updateFriends} id = {this.props.id} slip={single} userSuccess={this.props.userSuccess} handleBetChange = {this.props.handleBetChange}/>
                        );
                        })
                 }
            </Grid>
        );
    }
}

export default BetSlips