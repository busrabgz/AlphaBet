import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'

import Landing from './components/Landing.jsx'
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (

    <div className="App">
        <Router>
            <Landing />
        </Router>
    </div>
  );
}

export default App;