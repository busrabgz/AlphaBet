import React from 'react';
import MatchPicks from './MatchPicks';
import Performance from './Performance';
import BetSlips from './BetSlips';
import NotFollowed from './NotFollowed';
import avatarIcon from './avatar.png';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const cardMediaStyle = {
    width: 70,
}

const cardStyle = {
    display: 'flex',
    margin: 10,
}

function EditorHeader(props){
    const followed = props.followed == "true" ? true : false;
    return(
        <Box>
            <Card style={cardStyle}>
                <CardMedia
                height='25'
                style={cardMediaStyle}
                image={avatarIcon}
                />
                <div style={{display: "inherit"}}>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            {props.editorName}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <FormControlLabel control={<Switch checked={followed}/>} 
                                          label={ followed ? "Followed" : "Not Followed"} />
                    </CardContent>
                </div>
            </Card>
        </Box>
    );

}

function TabPanel(props) {
    const { children, value, index} = props;
  
    return (
      <div>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  
  
function EditorTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                <Tab label="Bet Slips"  />
                <Tab label="Match Picks" />
                <Tab label="Performance"  />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {props.editor.followed ? <BetSlips/> : <NotFollowed/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.editor.followed ? <MatchPicks editor={props.editor}/> : <NotFollowed/>}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.editor.followed ? <Performance editor={props.editor}/> : <NotFollowed/>}
            </TabPanel>
        </div>
    );
}

class EditorTabPanel extends React.Component {

    render() {
        return(
        <Paper>
            <EditorHeader followed={this.props.editor.followed} 
                          editorName={this.props.editor.name + " " + this.props.editor.surname}/>
            <EditorTabs editor={this.props.editor}/>
        </Paper>
        );
    }
}

export default EditorTabPanel