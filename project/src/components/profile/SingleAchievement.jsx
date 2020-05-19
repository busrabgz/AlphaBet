import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
    }

    render(){
        const renderMedia = () => {
            let component = '';
            if(this.props.achieved = "true")
                component = this.props.achName + "_true";
            else
                component = this.props.achName + "_false";

         return (<CardMedia
                height='auto'
                style={cardMediaStyle}
                image={component}
                />
                );
         }

        const renderTitle = () => {
            let title = '';
            let description = '';
            title = this.props.title;
            description = this.props.description;

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