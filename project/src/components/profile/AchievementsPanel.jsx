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
        this.state = {total_achievement_count: '', gained_achievement_count: '', ach: []}
    };

    componentDidMount () {
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
    
            if(this.props.userSuccess){
                axios.post(URL,
                {
                    "request_type": "get_gained_achievement_count",
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
                    "request_type": "get_gained_achievements",
                    "user_id": this.props.userId
                 },
                {withCredentials: false})
                .then( res => {
                    let temp = []
                    for(var i = 0; i < res.data.result.gained_achievements.length; i++){
                        temp[i] = {key: i, achName: res.data.result.gained_achievements[i][0], achDesc:res.data.result.gained_achievements[i][1], achieved:"true"};
                    }
                    this.setState({ach:temp})
                  })
                 .catch(error => {
                    console.log("achievements", error);
                    });
                }
    }

    render(){
        return(
            <div>
                 <Typography style={titleStyle} component="h5" variant="h5">
                 Achievements {this.state.gained_achievement_count} / {this.state.total_achievement_count}
                 </Typography>
                 {this.props.userSuccess &&
                    this.state.ach.map( (single) => {
                        console.log("single", single)
                        return(
                            <SingleAchievement key={single.key} achName={single.achName} achDesc= {single.achDesc} achieved={single.achieved} />
                        );
                        })
                    }
            </div>
        );
    }
}

export default AchievementsPanel