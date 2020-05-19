import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';

const URL = "http://localhost:5000/profile";

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

    constructor(props){
        super(props);
        this.state = {friends: []};

        if(this.props.userSuccess){
            axios.post(URL,
            {
                "request_type": "get_friends",
                "user_id": this.props.userId
             },
            {withCredentials: false})
            .then( res => {
                for(var i = 0; i < res.data.result.friends.length; i++){
                    this.state.friends[i] = <Friend key={i} name={res.data.result.friends[i]} />;
                }
                console.log(this.friends);
                })
             .catch(error => {
                console.log("friends", error);
                });
         }
    }

    render(){
        return(
            <Paper style={paperStyle} elevation={3}>
                <Title />
                {this.props.userSuccess &&
                        this.state.friends
                }
            </Paper>
        );
    }
}

export default FriendsPanel