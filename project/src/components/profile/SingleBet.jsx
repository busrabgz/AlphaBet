import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import wonIcon from './won.png'
import lostIcon from './lost.png'
import pendingIcon from './pending.png'

const cardStyle = {
    display: 'flex',
    margin: 10,
}

const cardMediaStyle = {
    width: 25,
    height: 25,
    margin: 10,
    padding: 10,
}



class SingleBet extends Component{

    render(){
        const renderIcon = () => {
            let icon = '';
            if(this.props.state == "won")
                icon = wonIcon
            else if(this.props.state == "lost")
                icon = lostIcon
            else
                icon = pendingIcon

            return (
                  <CardMedia
                    height='auto'
                    style={cardMediaStyle}
                    image={icon}
                />
            );
        }
        return(
            <Card style={cardStyle} width={1}>
                {renderIcon()}
                <div>
                    <CardContent>
                      <Typography component="h5" variant="subtitle1">
                        {this.props.home + "-" + this.props.away}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {this.props.type + ":" + this.props.odd}
                      </Typography>
                    </CardContent>
                </div>
            </Card>);
    }
}

export default SingleBet