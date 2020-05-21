import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import EditorBar from './editor/EditorBar.jsx'
import EditorTabPanel from './editor/EditorTabPanel.jsx'
import BetSlip from './feed/BetSlip.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Button';
import {UserContext} from './user-context';
import axios from 'axios';

const URL = "http://localhost:5000/editor";
 
const rootStyle = {
    paddingLeft: 15,
    paddingTop: 27,
    width: "calc(95% - 25em)",
}

const editor = {
    name: "Mustafa",
    surname: "Çavdar",
    SBSuccessRate: 80,
    noOfSlipsWon: 345,
    noOfSlipsLost: 65,
    winRate: 84,
}

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { clicked: false, editors: [], editor: {
            followed: false,
            id: "",
            name: "",
            SBSuccessRate: "",
            noOfSlipsWon: "",
            noOfSlipsLost: "",
            winRate: "",
            bet_slips: [],
            suggested_bets: []
            }
        }
        this.onClick = this.handleClick.bind(this);
        this.onSwitch = this.handleSwitch.bind(this);
        this.editors = [];

    }

    componentDidMount(){
        axios.post(URL,
            {
                "request_type": "display_editors",
                "user_id": this.props.id,
                "editor_id": ""
             },
            {withCredentials: false})
            .then( res => {
                for( var i = 0; i < res.data.editors.length; i++) {
                     var editor = {followed: res.data.editors[i].followed_by_user,
                                   id: res.data.editors[i].editor_id,
                                   name: res.data.editors[i].forename + " " + res.data.editors[i].surname,
                                   SBSuccessRate: res.data.editors[i].single_bet_win_count / (res.data.editors[i].single_bet_win_count + res.data.editors[i].single_bet_lose_count),
                                   noOfSlipsWon: res.data.editors[i].bet_slips_won,
                                   noOfSlipsLost: res.data.editors[i].bet_slips_lost,
                                   winRate: res.data.editors[i].winrate,
                                   bet_slips: res.data.editors[i].bet_slips,
                                   suggested_bets: res.data.editors[i].suggested_bets};
                     this.editors.push(editor);
                }
                console.log("in constructor editors are: ", this.editors);
                this.setState({editors: this.editors});
                })
             .catch(error => {
                console.log("editors", error);
                });
    }

    handleClick = (obj) => {
        this.setState({ editor: obj});
    }

    handleSwitch = () => {
        var isFollowed = this.state.editor.followed;
        if( isFollowed == false){
            axios.post(URL,
                {
                    "request_type": "follow_editor",
                    "user_id": this.props.id,
                    "editor_id": this.state.editor.id
                 },
                {withCredentials: false})
                .then( res => {
                        if(res.data.result.success){
                            var ed = this.state.editor;
                            ed.followed = true;
                            this.setState({ editor: ed});
                        }
                    })
                 .catch(error => {
                    console.log("editors", error);
                    });
          }
          else{
              axios.post(URL,
                    {
                        "request_type": "unfollow_editor",
                        "user_id": this.props.id,
                        "editor_id": this.state.editor.id
                     },
                    {withCredentials: false})
                    .then( res => {
                            if(res.data.result.success){
                                var ed = this.state.editor;
                                ed.followed = false;
                                this.setState({ editor: ed});
                            }
                        })
                     .catch(error => {
                        console.log("editors", error);
                        });
          }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.editor.followed != this.state.editor.followed) {
            console.log("iççç");
            this.setState({clicked: this.state.clicked == false ? true : false});
        }
    }

    render() {
        return(
            <UserContext.Consumer>
            { ( {username, balance, updateBalance, betslip, loggedIn, alphaCoins} ) => (
            <div>
                <NavBar type={this.props.type} id = {this.props.id} isLogged={loggedIn} alphaCoins={alphaCoins} />
                <div>
                    <BetSlip/>
                    <div style={rootStyle}>
                        <EditorBar key={this.state.editor.id} onClick={this.handleClick} editors = {this.state.editors}/>
                        <EditorTabPanel updateFriends = {this.props.updateFriends} id = {this.props.id} editor={this.state.editor} followed={this.state.editor.followed} onSwitch={this.handleSwitch} userSuccess={this.props.userSuccess}/>
                    </div>
                </div>
            </div>
            )}
        </UserContext.Consumer>
        )
    }
}

export default Editor