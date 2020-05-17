import React, { Component } from 'react';
import SingleBetSlip from './SingleBetSlip.jsx';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

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

    render(){
        return(
            <div>
                 <Title/>
                 <LostSlip/>
                 <WonSlip/>
            </div>
        );
    }

}

export default EndedPanel