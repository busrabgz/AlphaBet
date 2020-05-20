import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import avatarIcon from './avatar.png';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Button } from '@material-ui/core';


const rootStyle = {
    paddingRight: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: "100%",
}
const gridListStyle = {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: "100%",
}
const titleStyle = {
    color: '#AAAAAA',
}
const titleBarStyle = {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
}

const avatarStyle = {
    height: "100%",
    width: "auto",
}

class EditorBar extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div style={rootStyle}>
            <GridList style={gridListStyle} cols={0}>
                {this.props.editors.map((tile) => (
                <GridListTile key={avatarIcon}>
                    <img src={avatarIcon} style={avatarStyle} alt={'Image'} />
                    <GridListTileBar
                        actionPosition="left"
                        actionIcon={<Button onClick={() => this.props.onClick(tile)} style={{backgroundColor:"white", float:"center"}}>{tile.name}</Button>}
                    />
                </GridListTile>
                ))}
            </GridList>
            </div>
        );
    }
}

export default withWidth()(EditorBar)