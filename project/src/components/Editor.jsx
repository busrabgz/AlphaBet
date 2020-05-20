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
        this.state = {
            followed: "true",
            currentEditor : {
                name: "",
                surname: "",
                SBSuccessRate: "",
                noOfSlipsWon: "",
                noOfSlipsLost: "",
                winRate: "",
            },
        }
        this.onClick = this.handleClick.bind(this);
        this.onSwitch = this.handleSwitch.bind(this);
    }

    handleClick = (followed) => {
        this.setState({ currentEditor : editor});
    }

    handleSwitch = () => {
        this.setState({
            followed: this.state.followed == "true" ? "false" : "true"
        });
        console.log(this.state);
    }

    render() {
        return(
            <UserContext.Consumer>
            { ( {username, balance, updateBalance, betslip, loggedIn} ) => (
            <div>
                <NavBar id = {this.props.id} isLogged={loggedIn}/>
                <div>
                    <BetSlip slip={betslip} userBalance={balance} />
                    <div style={rootStyle}>
                        <EditorBar onClick={this.onClick}/>
                        <EditorTabPanel editor={this.state.currentEditor} followed={this.state.followed} onSwitch={this.onSwitch}/>
                    </div>
                </div>
            </div>
            )}
        </UserContext.Consumer>
        )
    }
}

export default Editor