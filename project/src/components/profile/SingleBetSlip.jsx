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
        console.log("şuan singlebetslip constructor")
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
        this.state = {
            id: 0,
            bets: [],
            total: 0
        }
        this.calculateTotalOdd = this.calculateTotalOdd.bind(this)
    }

    componentDidMount() {
        console.log("mpounted")
    }

    componentDidUpdate(prevState, prevProps) {
        if ( prevProps.bets != this.props.bets) {
            console.log("Im inside the component did update")
            this.setState({
                bets: this.props.bets,
                total: this.calculateTotalOdd()
            })
        }
    }

    calculateTotalOdd() {
        let total = 1
        for( var i  = 0; i < this.props.bets; i++ ) {
            total = total * this.props.bets[i].odd
        }
        console.log(total)
        return total
    }

    render(){
        console.log("render of singlebet")
        console.log("incoming bets ", this.props.bets )
        return(
            <Paper elevation={3}>
                <ExpansionPanel>
                  <ExpansionPanelSummary style={this.style}>
                    <Typography>{this.state.total}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={this.style}>
                    <Typography>
                    {this.props.bets != undefined && this.props.bets.map((bet) => {
                        console.log("bet", bet)
                        return (
                            //id'ler passlenmedi, dikkatli ol
                            <SingleBet state={this.props.state} type={bet.bet_type} home={bet.home_side} away={bet.away_side} odd={bet.odd} />
                        )
                    })}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        );
    }

}

export default SingleBetSlip