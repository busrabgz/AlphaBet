import React from 'react'
import { Button, ButtonGroup, Paper, Grid, Typography, Card, CardContent,ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails  } from '@material-ui/core'

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
                {props.info.name}
                </Typography>
                <Typography style={typeStyle} allign="center">
                {props.info.mail}
                </Typography>
                <ButtonGroup size="small">
                    <Button size="small" variant="contained">Accept</Button>
                    <Button size="small" variant="contained">Deny</Button>
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
            editorList: [],
            showInfo: false
        }

        let list  =[{username: "Ozan Aydın", name: "Ozan Aydın", mail: "dezak@gmail.com" }, 
        {username: "1000s2meGidelim", name: "Mert Aslan", mail: "maslan@gmail.com" },
        {username: "1000s2meGidelim", name: "Mert Aslan", mail: "maslan@gmail.com" }]

        for (var i = 0; i < list.length; i++) {
            let userInfo = {
                username: list[i].username,
                name: list[i].name,
                mail : list[i].mail,
            }
            this.state.editorList[i] = <EditorCard info = {userInfo}/>
        }
    }

    render() {
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item elevation={3} lg={3}>
                        <Paper style={paperStyle}>
                            <hı>Suggested Editors</hı>
                            {this.state.editorList}
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default EditorRequest