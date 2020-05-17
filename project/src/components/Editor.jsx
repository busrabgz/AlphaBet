import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import EditorBar from './editor/EditorBar.jsx'
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
            </div>

        )
    }
}

export default Editor