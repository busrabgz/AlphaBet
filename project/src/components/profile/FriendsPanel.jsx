import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const cardStyle = {
    border: "solid 1px",
    display: 'flex',
    bottom: 20,
}

const paperStyle = {
    padding: 10,
}

const titleStyle = {
    padding: 20,
}


function Friend(props){
    return(
        <Card style={cardStyle} width={1}>
            <div style={{width: "100%"}}>
                <CardContent style={{padding: 5}}>
                  <Typography align="center" component="h5" variant="subtitle1">
                    {props.name}
                  </Typography>
                  <Typography align="center" variant="caption" color="textSecondary">
                    selam
                  </Typography>
                </CardContent>
            </div>
        </Card>
    );
}

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Friends
           </Typography>
}

class FriendsPanel extends Component{



    render(){
    return(
        <Paper style={paperStyle} elevation={3}>
            <Title />
            <Friend name="Yüce Hasan Kılıç"/>
            <Friend name="Mert Aslan"/>
        </Paper>
    );
    }
}

export default FriendsPanel