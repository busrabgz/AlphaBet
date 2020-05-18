import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import EditorBar from './editor/EditorBar.jsx'
import EditorTabPanel from './editor/EditorTabPanel.jsx'
import BetSlip from './feed/BetSlip';
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
    followed: "false",
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
    }

    render() {
        return(
            <div>
                <NavBar />
                <div>
                    <BetSlip/>
                    <div style={rootStyle}>
                        <EditorBar />
                        <EditorTabPanel editor={editor}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Editor