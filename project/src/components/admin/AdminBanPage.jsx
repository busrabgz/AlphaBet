import React from 'react'
import { CardContent, Typography, Card, Grid, Paper, TextField, Button, CardActions, } from '@material-ui/core'
import axios from 'axios';

const URL = "http://localhost:5000/admin-dashboard/ban-users";

const cardStyle = {
    border: "solid 1px",
    display: 'flex',
    bottom: 20,
    width: "100%",
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

function UserCard(props) {
    return(
        <Card style={cardStyle} width={1}>
            <div style={{width: "100%"}}>
                <CardContent style={{padding: 5}}>
                  <Typography align="center" component="h5" variant="subtitle1">
                    {props.info.name}
                  </Typography>
                </CardContent>
            </div>
        </Card>
    )
}

function DetailCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography>
                    props.user.name
                </Typography>
            </CardContent>
        </Card>
    )
        
}



class AdminBanPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            search_text: '', 
            search_results: [], 
            user_details: "",
            focused_user_id: "",
            updated: "false",
            admin_id: this.props.id,
            update: false
        };
        this.searchUsers = this.searchUsers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.displayDetails = this.displayDetails.bind(this)
        this.banUser = this.banUser.bind(this)
    }

    unbanUser(event){
        axios.post(URL, 
            {
                "request_type": "unban_user",
                "user_id": event.target.value,
                },
                {withCredentials: false})
                .then( res => {
                    console.log("status", res.data.status)
                this.setState({
                    update: !this.state.update, 
                    })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    banUser(event){
        console.log("target", event.target.name)
        axios.post(URL, 
            {
                "request_type": "ban_user",
                "user_id": event.target.value,
                "admin_id": event.target.name
                },
                {withCredentials: false})
                .then( res => {
                    console.log("status", res.data.status)
                this.setState({
                    update: !this.state.update  
                    })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    searchUsers(){
        axios.post(URL, 
            {
                "request_type": "search_users",
                "username": this.state.search_text
                },
                {withCredentials: false})
                .then( res => {
                let temp = []
                for(var i = 0; i < res.data.users.length; i++){
                    temp[i] = res.data.users[i]
                }
                this.setState({
                    search_results: temp,
                    search_text: "",
                    update: !this.state.update,
                    updated: "false"
                })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
           });
    }   
    
    displayDetails(id){
        this.setState({
            focused_user_id: id
        })
        axios.post(URL, 
            {
                "request_type": "display_details_of_user",
                "user_id": this.state.focused_user_id
            },
            {withCredentials: false})
                .then( res => {    
                this.setState({
                    update: !this.state.update,
                    user_details: res.data.result.user_details[0][0],
                })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.update != this.state.update){
            this.setState({
                updated: this.state.updated == "true" ? "false" : "true"  
            })
        }
    }

    render() {
        return(
            <Grid container spacing={2} >
                <Grid item lg={5} md={5} sm={12} xs={12}>
                    <Paper elevation={4}>
                        <div style={{display: "flex",}}>
                        <TextField name="search_text" style={searchBoxStyle} onChange={this.handleChange}
                                    id="outlined-search" label="Enter Username Here" type="search" variant="outlined" />
                        <Button onClick={this.searchUsers} style={buttonStyle} size="small">search</Button>
                        </div>
                        <Grid container style={cardStyle} width={1}>
                            {this.state.search_results.map( (res) => {
                                    return(
                                        <Grid item lg={12}>
                                            <Card style={cardStyle} width={1}>
                                                <div style={{width: "100%", display:"flex",}}>
                                                    <CardContent style={{padding: 5, width: "90%"}}>
                                                    <Typography align="center" component="h5" variant="subtitle1">
                                                        {res.username}
                                                    </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button onClick={ () => {this.displayDetails(res.person_id)}}>Details</Button>
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>
                                    );
                                    })
                                }
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={5} md={5} sm={12} xs={12}>
                    {this.state.user_details != "" &&
                    <Paper elevation={4}>
                        <Typography align="center" component="h5" variant="subtitle1">
                            {"Username: " + this.state.user_details.username}
                        </Typography>
                        <Typography align="center" component="h5" variant="subtitle1">
                            {"Name: " + this.state.user_details.forename + " " + this.state.user_details.surname}
                        </Typography>
                        <Typography align="center" component="h5" variant="subtitle1">
                            {"Total Winnings: " + this.state.user_details.total_winnings}
                        </Typography>
                        <Typography align="center" component="h5" variant="subtitle1">
                            {"Account Balance: " + this.state.user_details.account_balance}
                        </Typography>
                        {
                            this.state.user_details.banned ? 
                            <button value={this.state.focused_user_id} onClick={this.unbanUser} variant="outlined" style={{backgroundColor:"green", width: "100%"}}>Unban this user</button>
                        :   <button name={this.state.admin_id} value={this.state.focused_user_id} onClick={this.banUser} variant="outlined" style={{backgroundColor:"red", width: "100%"}}>Ban this user</button>
                        }
                    </Paper>
                    } 
                </Grid>
            </Grid>
        )
    }
}

export default AdminBanPage