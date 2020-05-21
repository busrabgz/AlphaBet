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

/*function PendingSlip(props){
    return <SingleBetSlip state='pending'/>;
}
*/

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Pending
           </Typography>
}

class PendingPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pendingSlips: []
        }
    }

    componentDidMount() {
        axios.post(URL,{
            user_id: this.props.userId,
            request_type: "get_pending_bet_slips",
        }, 
        {withCredentials: false})
        .then( res => {
            let temp = []
            for (var i = 0; i < res.data.bet_slips.length; i++) {
                let totalOdd = 1
                for (var j = 0; j < res.data.bet_slips[i].bets.length; j++) {
                    totalOdd = totalOdd * res.data.bet_slips[i].bets[j].odd
                }
                temp.push( {total_odd: totalOdd, key:i, bets: res.data.bet_slips[i].bets, id: res.data.bet_slips[i].bet_slip_id})
            }
            this.setState({
                pendingSlips: temp
            })
        })
        .catch(error => {
            console.log("pending", error);
            });
    }

    render(){
        return(
            <div>
                 <Title/>
                 {this.state.pendingSlips.length != 0 && this.state.pendingSlips.map( (betslip) => {
                     return(
                         <SingleBetSlip state="pending" total_odd={betslip.total_odd} bets={betslip.bets} key={betslip.key} id={betslip.id}/>
                     )
                 })}
            </div>
        );
    }

}

export default PendingPanel