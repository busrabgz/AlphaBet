import React, { Component } from 'react';
import SingleBetSlip from './SingleBetSlip.jsx';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import axios from 'axios';

const URL = "http://localhost:5000/profile";

const titleStyle = {
    padding: 20,
}

function LostSlip(props){
    return <SingleBetSlip state='lost'/>;
}

function WonSlip(props){
    return <SingleBetSlip state='won'/>;
}

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Ended
           </Typography>
}

class EndedPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            endedSlips: []
        }
    }

    componentDidMount() {
        axios.post(URL,{
            user_id: this.props.userId,
            request_type: "get_ended_bet_slips",
        }, 
        {withCredentials: false})
        .then( res => {
            let temp = []
            for (var i = 0; i < res.data.bet_slips.length; i++) {
                let totalOdd = 1
                let lost = false
                for (var j = 0; j < res.data.bet_slips[i].bets.length; j++) {
                    if(res.data.bet_slips[i].bets[j].result == "LOST")
                        lost = true
                    totalOdd = totalOdd * res.data.bet_slips[i].bets[j].odd
                }
                temp.push( {state: lost ? "lost" : "won",  total_odd: totalOdd, key:i, bets: res.data.bet_slips[i].bets, id: res.data.bet_slips[i].bet_slip_id})
            }
            this.setState({
                endedSlips: temp
            })
        })
        .catch(error => {
            console.log("pending", error);
            });
    }

    render(){
        console.log(this.state.endedSlips)
        return(
            <div>
                <Title/>
                {this.state.endedSlips.length != 0 && this.state.endedSlips.map( (betslip) => {
                    return(
                        <SingleBetSlip state={betslip.state} total_odd={betslip.total_odd} bets={betslip.bets} key={betslip.key} id={betslip.id}/>
                    )
                })}
            </div>
        );
    }

}

export default EndedPanel