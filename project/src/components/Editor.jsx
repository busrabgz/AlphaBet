import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import EditorBar from './editor/EditorBar.jsx'
import EditorTabPanel from './editor/EditorTabPanel.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {UserContext} from './user-context';
 

class Editor extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <NavBar />
                <div>
                    <EditorBar />
                </div>
                <div style={{display: "inline-block",float:"left"}}> 
                    <EditorTabPanel />
                </div>
            </div>

        )
    }
}

export default Editor