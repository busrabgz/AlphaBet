import React, { Component } from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import SingleSlip from './SingleSlip'

class BetSlips extends Component {

    render(){
        return (
            <Grid container spacing={3}>
                {this.props.editor.bet_slips && this.props.editor.bet_slips.map( (single) => {
                        return(
                            <SingleSlip slip={single}/>
                        );
                        })
                 }
            </Grid>
        );
    }
}

export default BetSlips