import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import babyAchFalse from './babyAchFalse.png';
import babyAchTrue from './babyAchTrue.png';
import friendsAchTrue from './friendsAchTrue.png';
import friendsAchFalse from './friendsAchFalse.png';

const cardStyle = {
    display: 'flex',
    margin: 10,
}

const cardMediaStyle = {
    width: 120,
}

class SingleAchievement extends Component {
    constructor(props){
        super(props);
        this.imgDir = "./" + this.props.achName + ".png"
    }

    render(){
        const renderMedia = () => {
            let component = '';
            switch(this.props.achName){
              case 'babyAch':
                if(this.props.achieved == "true")
                    component = babyAchTrue
                else
                    component = babyAchFalse
                break;
              case 'friendsAch':
                if(this.props.achieved == "true")
                    component = friendsAchTrue
                else
                    component = friendsAchFalse
                break;
              default:
                break;
            }

         return (<CardMedia
                height='auto'
                style={cardMediaStyle}
                image={component}
                />);
        }

        const renderTitle = () => {
            let title = '';
            let description = '';
            switch(this.props.achName){
              case 'babyAch':
                title = "Baby Steps";
                description = "Placed My First Bet"
                break;
              case 'friendsAch':
                title = "You Will Never Walk Alone";
                description = "Have Ten Friends"
                break;
              default:
                break;
                }
             return (<CardContent>
                  <Typography component="h5" variant="h5">
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {description}
                  </Typography>
                </CardContent>);
            }

        return(
          <Card style={cardStyle}>
              {renderMedia()}
              <div>
                {renderTitle()}
              </div>
        </Card>
        );
    }

}

export default SingleAchievement