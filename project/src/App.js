import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx'
import logo from './logo.svg';
import './App.css';

function App() {
const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (

    <div className="App">
        <NavBar />
      <header className="App-header">

        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;