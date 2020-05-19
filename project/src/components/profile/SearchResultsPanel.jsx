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
import axios from 'axios';
import FriendsPanel from './FriendsPanel.jsx';

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
                </CardContent>
                <CardActions>
                    <Button contained color='primary' size="small" onClick={props.handleAddClick} value1={props.user_id} value={props.id}>+Add Friend</Button>
                </CardActions>
            </div>
        </Card>
    );
}

function Title(){
    return <Typography style={titleStyle} component="h5" variant="h5">
                Add Friends
           </Typography>;
}

class SearchResultsPanel extends Component{
    constructor(props){
        super(props);
        this.state = {search_text: '', search_results: [], showButton: true};
        this.handleClick = this.handleClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAddClick(value){
        this.setState({showButton:false})
        axios.post(URL,
            {
                "request_type": "add_friend",
                "user_id": this.props.userId,
                "friend_id": value
             },
            {withCredentials: false})
            .then( res => {
                if(res.data.result.success){
                    this.props.dummyFunc()
                }
                })
             .catch(error => {
                console.log("add friend", error);
                });
    }

    handleClick(event){
        this.setState({search_results: [], showButton:true});
        axios.post(URL,
            {
                "request_type": "search_users",
                "user_id": this.props.userId,
                "search_text": this.state.search_text
             },
            {withCredentials: false})
            .then( res => {
                this.setState({search_results: res.data.result.searched_users});
                })
             .catch(error => {
                console.log("search results", error);
                });
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
           });
    }

    render(){
    return(
        <Paper style={paperStyle} elevation={3}>
            <Title />
            <div style={{display: "flex",}}>
            <TextField name="search_text" style={searchBoxStyle} defaultValue= {this.state.search_text} onChange={this.handleChange}
                        id="outlined-search" label="Enter Username Here" type="search" variant="outlined" />
            <Button style={buttonStyle} size="small" onClick={this.handleClick}>search</Button>
            </div>
            {this.props.userSuccess &&
                    this.state.search_results.map( (res) => {
                        return(
                             <Card style={cardStyle} width={1}>
                                <div style={{width: "100%", display:"flex",}}>
                                    <CardContent style={{padding: 5, width: "90%"}}>
                                      <Typography align="center" component="h5" variant="subtitle1">
                                        {res.username}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {this.state.showButton && <Button contained color='primary' size="small" value={res.user_id} onClick={() => this.handleAddClick(res.user_id)} >+Add Friend</Button> }
                                    </CardActions>
                                </div>
                            </Card>
                        );
                        })
                    }
        </Paper>
    );
    }
}

export default SearchResultsPanel