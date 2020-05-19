import React, { Component } from 'react';
import SingleAchievement from './SingleAchievement.jsx';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const URL = "http://localhost:5000/profile";

const titleStyle = {
    padding: 20,
}

class AchievementsPanel extends Component {
    constructor(props){
        super(props);
        this.updateBalance = props.update;
        this.state = {total_achievement_count: '', gained_achievement_count: '', gained_achievements: []}

        axios.post(URL,
        {
            "request_type": "get_total_achievement_count"
         },
        {withCredentials: false})
        .then( res => {
            this.setState({total_achievement_count: res.data.result.total_achievement_count});
            })
         .catch(error => {
            console.log("total achievement count", error);
            });

        axios.post(URL,
        {
            "request_type": "get_gained_achievements",
            "user_id": this.props.userId
         },
        {withCredentials: false})
        .then( res => {
            this.setState({gained_achievement_count: res.data.result.gained_achievement_count});
            })
         .catch(error => {
            console.log("gained achievement count", error);
            });

        axios.post(URL,
        {
            "request_type": "get_gained_achievements"
         },
        {withCredentials: false})
        .then( res => {
            this.setState({gained_achievements: res.data.result.gained_achievements});
            })
         .catch(error => {
            console.log("total achievement count", error);
            });
    };

    render(){
        var achievements = [];
        for (var i = 0; i < this.state.gained_achievements.length; i++) {
            achievements.push(<SingleAchievement achName={i[0]} achDesc={i[1]} achieved="true" />);
        }
        return(
            <div>
                 <Typography style={titleStyle} component="h5" variant="h5">
                    Achievements {this.state.gained_achievement_count} / {this.state.total_achievement_count}
                 </Typography>
                 <tbody> {achievements} </tbody>;
            </div>
        );
    }
}

export default AchievementsPanel