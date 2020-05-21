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
    console.log("EDITOR HEADER FOLLOWED: ", props.followed);
    return(
        <Box>
            <Card style={cardStyle}>
                {props.editor.name == "" ? "" :
                <CardMedia
                height='25'
                style={cardMediaStyle}
                image={avatarIcon}
                />
                }
                {props.editor.name == "" ? "" :
                <div style={{display: "inherit"}}>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            {props.editor.name}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <FormControlLabel onChange={props.onSwitch}
                                          control={<Switch checked={props.followed}/>}
                                          label={ props.followed ? "Followed" : "Not Followed"} />
                    </CardContent>
                </div>
                }
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
            {props.editor.name == "" ? "" :
                <div>
                    <TabPanel value={value} index={0}>
                    {props.followed == true ? <BetSlips updateFriends = {props.updateFriends} id = {props.id} editor={props.editor} userSuccess={props.userSuccess}/> : <NotFollowed/>}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {props.followed == true ? <MatchPicks editor={props.editor}/> : <NotFollowed/>}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {props.followed == true ? <Performance editor={props.editor}/> : <NotFollowed/>}
                    </TabPanel>
                </div>
            }
        </div>
    );
}

class EditorTabPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editor: ''};
        }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.editor != this.props.editor) {
            console.log("PREV ", prevProps.editor);
            console.log("NOW ", this.props.editor);
            this.setState({editor: this.props.editor});
        }
    }

    render() {
        return(
        <Paper>
            <EditorHeader onSwitch={this.props.onSwitch} followed={this.state.editor.followed} editor={this.state.editor}/>
            <EditorTabs updateFriends = {this.props.updateFriends} id = {this.props.id} followed={this.state.editor.followed} editor={this.state.editor} userSuccess={this.props.userSuccess}/>
        </Paper>
        );
    }
}

export default EditorTabPanel