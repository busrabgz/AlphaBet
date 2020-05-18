import React from 'react'
import { Paper, Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CardActions, Button} from '@material-ui/core'

const mediaStyle = {
    height: 110,
}
const rootStyle = {
    maxWidth: 150,
    maxHeight:220,
}
const content = {
    maxHeight: 40
}
class EditorBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorList: [{imageURL: '', editorName: 'Mustafa Can Çavdar'}, {imageURL: '', editorName: 'Ozan German'}, {imageURL: '', editorName: 'Mert Hasan Büyükgebiz'}]
        }
    }
    render() {
        const cards = []
        console.log(this.state.editorList[0].editorName)
        for (var i = 0; i < this.state.editorList.length; i++) {
            //imageUrl = this.state.editorList[i].imageURL
           
            cards[i] = 
            <Card style={rootStyle}>
                <CardActionArea  >
                    <CardMedia style={mediaStyle} image="https://img2.pngindir.com/20180614/ywk/kisspng-aang-avatar-the-last-airbender-the-promise-ka-avatar-aang-5b225fac9ce273.1192537415289793726426.jpg"/>
                    <CardContent style={content}>
                        <h3>
                            { this.state.editorList[i].editorName}
                        </h3>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size='small' color='primary'>
                        Follow
                    </Button>
                </CardActions>
            </Card>
        }

        return(
            <div>
                <Grid container direction="row" md={12}>
                    {cards}
                </Grid>
            </div>
        )
    }
}

export default EditorBar