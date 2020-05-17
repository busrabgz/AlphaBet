import React, { Component } from 'react'
import {UserContext} from '../user-context';import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import expandIcon from './expand.png';
import FeedSummary from './bet/FeedSummary.jsx'
import FeedComments from './bet/FeedComments.jsx'
import FeedDetails from './bet/FeedDetails.jsx'


const divStyle = {
  border: "solid #000000",
  marginBottom: "10px",
  };

const iconStyle = {
    width: 50,
    height: 50,
};

class SingleFeed extends Component {

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div style={divStyle}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon= <img style={iconStyle} src={expandIcon}/>
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                    <FeedSummary/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FeedDetails/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <FeedComments/>
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default SingleFeed