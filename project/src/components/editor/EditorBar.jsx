import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import avatarIcon from './avatar.png';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


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
 
  const tileData = [
    {
        img: avatarIcon, title: 'Image', author: 'Ozan Güven',
    },
    {
        img: avatarIcon, title: 'Image', author: 'Rıdvan Dilmen',
    },
    {
        img: avatarIcon, title: 'Image', author: 'Fatih Terim',
    },
    {
        img: avatarIcon,  title: 'Image', author: 'author',
    },
    {
        img: avatarIcon, title: 'Image', author: 'author',
    },
    {
        img: avatarIcon, title: 'Image', author: 'author',
    },
    {
        img: avatarIcon, title: 'Image', author: 'author',
    },
    {
        img: avatarIcon, title: 'Image', author: 'author',
    },
    {
        img: avatarIcon, title: 'Image', author: 'author',
    },
  ];
 
class EditorBar extends Component {
    render(){
        return (
            <div style={rootStyle}>
            <GridList style={gridListStyle} cols={0}>
                {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                    <img src={tile.img} style={avatarStyle} alt={tile.title} />
                    <GridListTileBar title={tile.author}/>
                </GridListTile>
                ))}
            </GridList>
            </div>
        );
    }
}

export default withWidth()(EditorBar)