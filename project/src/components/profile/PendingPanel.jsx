import React, { Component } from 'react';
import SingleBetSlip from './SingleBetSlip.jsx';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const titleStyle = {
    padding: 20,
}

function PendingSlip(){
    return <SingleBetSlip state='pending'/>;
}

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Pending
           </Typography>
}

class PendingPanel extends Component {

    render(){
        return(
            <div>
                 <Title/>
                 <PendingSlip/>
                 <PendingSlip/>
            </div>
        );
    }

}

export default PendingPanel