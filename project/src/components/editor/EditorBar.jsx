import React from 'react'
import { Paper, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'


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
            //name = this.state.editorList[i].editorName
            cards[i] = <Card>
                <CardActionArea>
                    <CardMedia image="https://img2.pngindir.com/20180614/ywk/kisspng-aang-avatar-the-last-airbender-the-promise-ka-avatar-aang-5b225fac9ce273.1192537415289793726426.jpg"   />
                    <CardContent>
                        <Typography>
                            Something
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        }

        return(
            <div>
                <Paper>
                    {cards}
                </Paper>
            </div>
        )
    }
}

export default EditorBar