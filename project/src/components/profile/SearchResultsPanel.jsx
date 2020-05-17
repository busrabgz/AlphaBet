import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';

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

const searchBoxStyle = {
    marginBottom:20,
    width: "100%",
}

const buttonStyle = {
    height: 60,
    float: "right",
    paddingLeft: 15,
    paddingRight: 15
}

function Result(props){
    return(
        <Card style={cardStyle} width={1}>
            <div style={{width: "100%", display:"flex",}}>
                <CardContent style={{padding: 5, width: "90%"}}>
                  <Typography align="center" component="h5" variant="subtitle1">
                    {props.name}
                  </Typography>
                  <Typography align="center" variant="caption" color="textSecondary">
                    selam
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button contained color='primary' size="small">+Add Friend</Button>
                </CardActions>
            </div>
        </Card>
    );
}

function SearchField(){
    return(
        <div style={{display: "flex",}}>
            <TextField style={searchBoxStyle} id="outlined-search" label="Enter Username Here" type="search" variant="outlined" />
            <Button style={buttonStyle} size="small">search</Button>
        </div>
    );
}

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Add Friends
           </Typography>;
}

class SearchResultsPanel extends Component{



    render(){
    return(
        <Paper style={paperStyle} elevation={3}>
            <Title />
            <SearchField/>
            <Result name="Yüce Hasan Kılıç"/>
            <Result name="Mert Aslan"/>
        </Paper>
    );
    }
}

export default SearchResultsPanel