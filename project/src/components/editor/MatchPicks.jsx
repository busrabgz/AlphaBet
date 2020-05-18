import React, { Component } from 'react';
import {Box, Paper, Typography} from '@material-ui/core';


const matches = [
    {
        homeSide:  "Beşiktaş",
        awaySide:  "Trabzonspor",
        pickedBet: "FT: 1",
        odd:       "1.4",
        comment:   "Beşiktaş is in good form. " + 
                   "They transferred new stars to their team. " +
                   "Beşiktaş doesn't lose at home."
    },
    {
        homeSide:  "Galatasaray",
        awaySide:  "Fenerbahçe",
        pickedBet: "Over: 2.5",
        odd:       "1.8",
        comment:   "Fatih Terim is on the hunt for even more goals!"
    },
]

function PickedMatch(props){

    const boxStyle = {
        display: "block",
        width: "100%",        
    }

    return(
        <Box style={boxStyle}>
            <Box style={{boxStyle}}>
                <Paper style={{padding: 0, backgroundColor:"yellow",  width:"80%", float: "left",}}>
                    <Typography align="left" variant="h6">
                        {props.match.homeSide} - {props.match.awaySide}
                    </Typography>
                </Paper>
                <Paper style={{padding: 0, backgroundColor:"yellow", width:"20%", float: "right",}}>
                    <Typography align="right" variant="h6">
                        {props.match.pickedBet} &emsp; {props.match.odd}
                    </Typography>
                </Paper>
            </Box>
            <Box style={{marginTop:"40", display: "block"}}>
                <Paper style={{padding: 20,}}>
                    <Typography align="left">
                        {props.editor.name} says: {props.match.comment}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

class MatchPicks extends Component {


    render(){
        return (
            matches.map((match) => {
                return (<PickedMatch editor={this.props.editor} match={match}/>);
            }
        ));
    }
}

export default MatchPicks