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
        console.log("pending constructordayız")
        this.state = {
            pendingSlips: []
        }
    }

    componentDidMount() {
        console.log("şimdi de pending componentdidmount")
        axios.post(URL,{
            user_id: this.props.userId,
            request_type: "get_pending_bet_slips",
        }, 
        {withCredentials: false})
        .then( res => {
            console.log("respone:", res)
            let temp = []
            for (var i = 0; i < res.data.bet_slips.length; i++) {
                for (var j = 0; j < res.data.bet_slips[i].bets.length; j++) {
                    if (res.data.bet_slips[i].bets[j].result == "PENDING") {
                        temp.push( {key:i, bets: res.data.bet_slips[i].bets, id: res.data.bet_slips[i].bet_slip_id})
                        break
                    }
                }
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
        console.log("ilk olarak pending renderdayım")
        return(
            <div>
                 <Title/>
                 {this.state.pendingSlips.length != 0 && this.state.pendingSlips.map( (betslip) => {
                     console.log("betslips bets: ", betslip.bets) 
                     return(
                         <SingleBetSlip state="pending" bets={betslip.bets} key={betslip.key} id={betslip.id}/>
                     )
                 })}
            </div>
        );
    }

}

export default PendingPanel