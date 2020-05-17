import React, { Component } from 'react';
import SingleAchievement from './SingleAchievement.jsx';
import Typography from '@material-ui/core/Typography';

const titleStyle = {
    padding: 20,
}

class AchievementsPanel extends Component {

    render(){
        return(
            <div>
                 <Typography style={titleStyle} component="h5" variant="h5">
                    Achievements
                 </Typography>
                <SingleAchievement achName="babyAch" achieved="true"/>
                <SingleAchievement achName="friendsAch" achieved="true"/>
                <SingleAchievement achName="babyAch" achieved="false"/>
                <SingleAchievement achName="friendsAch" achieved="false"/>
            </div>
        );
    }

}

export default AchievementsPanel