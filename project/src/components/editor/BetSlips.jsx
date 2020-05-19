import React, { Component } from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import SingleSlip from './SingleSlip'

const slip =  {
        totalOdd: "5.65",
        likeCount: "15",
        bets : [
            {
                homeSide: "Real Madrid",
                awaySide: "Galatasaray",
                bet     : "FT : 2",
                odd     : "5.6",
            },

            {
                homeSide: "Beşiktaş",
                awaySide: "Olimpiakos",
                bet     : "FT : 1",
                odd     : "1.05",
            },

            {
                homeSide: "Helsinki",
                awaySide: "Beşiktaş",
                bet     : "FT : 2",
                odd     : "1.25",
            },
        ],
        comments : [
            {
                commentor: "Yüce",
                comment  : "Bu kupon tutar",
                likeCount: 15
            },
            {
                commentor: "Ozan",
                comment  : "Bu kupon tutmaz",
                likeCount: 22
            },
        ],
    }

class BetSlips extends Component {


    render(){
        return (
            <Grid container spacing={3}>
                <SingleSlip slip={slip}/>
                <SingleSlip slip={slip}/>
                <SingleSlip slip={slip}/>
                <SingleSlip slip={slip}/>
                <SingleSlip slip={slip}/>
            </Grid>
        );
    }
}

export default BetSlips