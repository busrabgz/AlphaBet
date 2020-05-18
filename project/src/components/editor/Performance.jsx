import React, { Component } from 'react';
import { Box, Paper, CircularProgress, Typography } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';

const paperStyle = {
    padding: 20,
}

class Performance extends Component {


    render(){
        return (
            <Box>
                <Paper style={paperStyle}>
                    <Typography align="left" variant="h6">
                        This editor has {this.props.editor.SBSuccessRate}% success rate on single bets
                    </Typography>
                </Paper>
                <Paper style={paperStyle}>
                    <Typography align="left" variant="h6">
                        Number of betslips won : {this.props.editor.noOfSlipsWon} 
                    </Typography>  
                </Paper>
                <Paper style={paperStyle}>
                    <Typography align="left" variant="h6">
                        Number of betslips lost : {this.props.editor.noOfSlipsLost}
                    </Typography>  
                </Paper>
                <Paper style={paperStyle}>
                    <Typography align="left" variant="h6">
                    This editor has {this.props.editor.winRate}% winrate
                    </Typography> 
                </Paper>
            </Box>
        );
    }
}

export default Performance