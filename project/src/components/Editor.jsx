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
            currentEditor : {
                id: "",
                name: "",
                SBSuccessRate: "",
                noOfSlipsWon: "",
                noOfSlipsLost: "",
                winRate: "",
                bet_slips: [],
                suggested_bets: []
            }}
        }
        this.onClick = this.handleClick.bind(this);
        this.onSwitch = this.handleSwitch.bind(this);
        this.editors = [];

        axios.post(URL,
            {
                "request_type": "display_editors",
                "user_id": props.id,
                "editor_id": ""
             },
            {withCredentials: false})
            .then( res => {
                for( var i = 0; i < res.data.editors.length; i++) {
                     var editor = {id: res.data.editors[i].editor_id,
                                   name: res.data.editors[i].forename + " " + res.data.editors[i].surname,
                                   bet_slips_lost: res.data.editors[i].bet_slips_lost,
                                   bet_slips_won: res.data.editors[i].bet_slips_won,
                                   winrate: res.data.editors[i].winrate,
                                   single_bet_success_rate: res.data.editors[i].single_bet_win_count / (res.data.editors[i].single_bet_win_count + res.data.editors[i].single_bet_lose_count),
                                   follow: res.data.editors[i].followed_by_user,
                                   bet_slips: res.data.editors[i].bet_slips,
                                   suggested_bets: res.data.editors[i].suggested_bets};
                     this.editors.push(editor);
                     this.setState({editors: this.editors});
                }

                })
             .catch(error => {
                console.log("editors", error);
                });
    }

    handleClick = (obj) => {
        this.setState({ editor: {followed: obj.follow, currentEditor : {
                id: obj.id,
                name: obj.name,
                SBSuccessRate: obj.single_bet_success_rate,
                noOfSlipsWon: obj.bet_slips_won,
                noOfSlipsLost: obj.bet_slips_lost,
                winRate: obj.winrate,
                bet_slips: obj.bet_slips,
                suggested_bets: obj.suggested_bets
            }}});
    }

    handleSwitch = () => {
        console.log(this.state.editor.currentEditor.id);
        var isFollowed = this.state.editor.followed;
        if( isFollowed == false){
            axios.post(URL,
                {
                    "request_type": "follow_editor",
                    "user_id": this.props.id,
                    "editor_id": this.state.editor.currentEditor.id
                 },
                {withCredentials: false})
                .then( res => {
                        if(res.data.result.success){
                            var editor = this.state.editor.currentEditor;
                            this.setState({ editor: { followed: true, currentEditor: editor}
                            });
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
                        "editor_id": this.state.editor.currentEditor.id
                     },
                    {withCredentials: false})
                    .then( res => {
                            if(res.data.result.success){
                                var editor = this.state.editor.currentEditor;
                                this.setState({ editor: { followed: false, currentEditor: editor}
                                });
                            }
                        })
                     .catch(error => {
                        console.log("editors", error);
                        });
          }
    }

    componentDidUpdate(prevProps, prevState){
        console.log("aaaaaa");
        if (prevState.editor.followed != this.state.editor.followed) {
            console.log("iççç");
            this.setState({clicked: this.state.clicked == false ? true : false});
        }
    }

    render() {
        console.log(this.state.editor.followed);
        return(

            <UserContext.Consumer>
            { ( {username, balance, updateBalance, betslip, loggedIn, alphaCoins} ) => (
            <div>
                <NavBar id = {this.props.id} isLogged={loggedIn} alphaCoins={alphaCoins} />
                <div>
                    <BetSlip slip={betslip} userBalance={balance} />
                    <div style={rootStyle}>
                        <EditorBar key={this.state.editor.currentEditor.id} onClick={this.handleClick} editors = {this.state.editors}/>
                        <EditorTabPanel editor={this.state.editor.currentEditor} followed={this.state.editor.followed} onSwitch={this.handleSwitch}/>
                    </div>
                </div>
            </div>
            )}
        </UserContext.Consumer>
        )
    }
}

export default Editor