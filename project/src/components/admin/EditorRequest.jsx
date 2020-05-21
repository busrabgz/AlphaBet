import React from 'react'
import { Button, ButtonGroup, Paper, Grid, Typography, Card, CardContent,ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails  } from '@material-ui/core'
import axios from 'axios';

const URL = "http://localhost:5000/admin-dashboard/editors";

const paperStyle = {
    padding: 5
}

const cardStyle = {
    border: "solid 1px",
    display: 'flex',
    bottom: 20,
}

const divStyle = {
    height: 70
}

const typeStyle = {
    width: "100%"
}

function EditorCard(props) {
    return(
        <Paper elevation={3}>
            <ExpansionPanel>
            <ExpansionPanelSummary >
                <Typography>{props.info.username}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
            <div style={divStyle}>
                <Typography style={typeStyle} allign="center">
                {props.info.forename + " " + props.info.surname}
                </Typography>
                <ButtonGroup size="small">
                    <button value={props.info.person_id} onClick={props.accept} size="small" variant="contained">Accept</button>
                    <button value={props.info.person_id} onClick={props.decline} size="small" variant="contained">Deny</button>
                </ButtonGroup>
                
            </div>
            </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>
    )
}



class EditorRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            showInfo: false
        }
        this.acceptRequest = this.acceptRequest.bind(this)
        this.declineRequest = this.declineRequest.bind(this)
    }

    acceptRequest(event){
        console.log("ac")
        axios.post(URL, 
            {
                "request_type": "accept_editor_request",
                "person_id": event.target.value
            },
            {withCredentials: false})
                .then( res => {  
                })
                .catch( (error) => {
                console.log("info", error)
            });
            
        console.log("cept id: ", event.target.value)
    }

    declineRequest(event){
        axios.post(URL, 
            {
                "request_type": "decline_editor_request",
                "person_id": event.target.value
            },
            {withCredentials: false})
                .then( res => {  
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    componentDidMount(){
        axios.post(URL, 
            {
                "request_type": "display_editor_requests"
            },
            {withCredentials: false})
                .then( res => {  
                    let temp = []
                    for(let i = 0; i < res.data.editor_requests.length; i++)  
                        temp[i] = res.data.editor_requests[i]
                    this.setState({
                        requests: temp,
                    })
                    console.log(" reqs ", this.state.requests)
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    render() {
        console.log(this.state.requests)
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item elevation={3} lg={3}>
                        <Paper style={paperStyle}>
                            <hı>Suggested Editors</hı>
                            {this.state.requests.map( request => {
                                return(
                                    <EditorCard accept={this.acceptRequest} decline={this.declineRequest} info={request}/>
                                )})}
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default EditorRequest