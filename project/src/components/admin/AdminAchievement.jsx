import React from 'react'
import SingleAchievement from "../profile/SingleAchievement.jsx"
import { Typography,Button, Box, Paper } from '@material-ui/core'
import axios from 'axios';

//add handlesubmit
const URL = "http://localhost:5000/admin-dashboard/modify-achievements";

const achievementStyle = {
    width: "70%",
}
const buttonStyle = {
    width: "20%",
    float: "right",
    backgroundColor: "#e32222",
    color:"white"
}

const submitStyle = {
    backgroundColor: "#4CAF50",
}
class AdminAchievements extends React.Component {
    constructor(props)  {
        super(props)
        this.state = {
            achName: "",
            achDesc: "",
            achievements: [],
            update: "false",
            admin_id: this.props.id
        }
        this.handleChange = this.handleChange.bind(this);
        this.disableAchievement = this.disableAchievement.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
         });
     }

    handleSubmit(event){
        axios.post(URL, 
            {
                "request_type": "add_achievement",
                "achievement_name": this.state.achName,
                "achievement_description": this.state.achDesc,
                "admin_id": this.state.admin_id
            },
            {withCredentials: false})
                .then( res => {    
                this.setState({
                    achievements: res.data.achievements,
                })
                })
                .catch( (error) => {
                    alert("errror")
            });
    }

    componentDidMount(){
        axios.post(URL, 
            {
                "request_type": "display_all_achievements",
            },
            {withCredentials: false})
                .then( res => {    
                this.setState({
                    achievements: res.data.achievements,
                })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.achievements != this.state.achievements){
            this.setState({
                updated: this.state.updated == "true" ? "false" : "true"  
            })
        }
    }

    disableAchievement(event){
        console.log("ACH ID IS", event.target)
        axios.post(URL, 
            {
                "request_type": "remove_achievement",
                "achievement_id": event.target.value
                
            },
            {withCredentials: false})
                .then( res => {    
                    this.setState({
                        updated: this.state.updated == "true" ? "false" : "true"  
                    })
                })
                .catch( (error) => {
                console.log("info", error)
            });
    }

    render() {
        return(
            <div>
                <Paper elevation={4}>
                    <div style={{float:"right"}}>
                        <form onSubmit={this.handleSubmit}>
                            <input                     
                            type="achName"
                            name = "achName"
                            placeholder="AchievementName"
                            value={this.state.achName}
                            onChange={this.handleChange}
                            required />
                            <input                     
                            type="achDesc"
                            name = "achDesc"
                            placeholder="Achievement Desc"
                            value={this.state.achDesc}
                            onChange={this.handleChange}
                            required />
                            <Button type="submit" style={submitStyle} size="small">Add Achievement</Button>
                        </form>
                    </div>
                </Paper>
                 <Typography component="h5" variant="h5">
                    Achievements
                 </Typography>
                 {
                    this.state.achievements.map( achievement => {
                        return(
                            <div style={{display: "inline-block", width:"100%"}}>
                                <Box justifyContent="flex-start">
                                    <SingleAchievement  achDesc={achievement.achievement_description} style={achievementStyle} achName={achievement.achievement_name} achieved="true"/>
                                </Box>
                                <Box justifyContent="flex-end">
                                    <button onClick={this.disableAchievement} value={achievement.achievement_id} style={buttonStyle} size="small"> Disable</button>
                                </Box>
                            </div>
                    )})
                 }
            </div>
        )
    }
}


export default AdminAchievements