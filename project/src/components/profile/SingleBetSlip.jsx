import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import SingleBet from './SingleBet.jsx';

const pendingExpSummaryStyle = {
    border: "solid 1px",
    borderRadius: "50px!important",
    backgroundColor: "#EFFF04",
}

const wonExpSummaryStyle = {
    border: "solid 1px",
    borderRadius: "50px!important",
    backgroundColor: "#04E14D",
}

const lostExpSummaryStyle = {
    border: "solid 1px",
    borderRadius: "50px!important",
    backgroundColor: "#FF1414",
}

class SingleBetSlip extends Component {
    constructor(props){
        super(props);
        switch(this.props.state){
        case 'pending':
            this.style = pendingExpSummaryStyle;
            break;
        case 'won':
            this.style = wonExpSummaryStyle;
            break;
        case 'lost':
            this.style = lostExpSummaryStyle
            break;
        default:
            break;
        }
    }

    render(){
        return(
            <Paper elevation={3}>
                <ExpansionPanel>
                  <ExpansionPanelSummary style={this.style}>
                    <Typography>Bet Slip With Total Odd 6.5</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={this.style}>
                    <Typography>
                        <SingleBet state="won"/>
                        <SingleBet state="lost"/>
                        <SingleBet state="pending"/>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        );
    }

}

export default SingleBetSlip