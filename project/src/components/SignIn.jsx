import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import { browserHistory } from 'react-router';
import Landing from './Landing.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';

const URL = "http://localhost:5000/signin";

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {username: "", password: "", logged_in: false}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event){
    axios.post(URL,
        {
            username: this.state.username,
            password: this.state.password
         },
        {withCredentials: false})
        .then( res => {
            if(res.data.result.success == "true"){
                console.log("login", res);
                this.setState({ logged_in: true });
                 }
            })
         .catch(error => {
            console.log("login", error);
            });
    event.preventDefault();
   }

   handleChange(event) {
       this.setState({
        [event.target.name]: event.target.value
       });
   }

  render() {
    if (this.state.logged_in) {
      // redirect to home if logged in
      return <Redirect to = {{ pathname: "/profile" }} />;
    }
    return (<div>
        <NavBar />
        <h1>Login Page</h1>
         <form onSubmit={this.handleSubmit}>
            <input
                type="username"
                name = "username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
            />

            <input
                type="password"
                name = "password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>);
  }
}

export default SignIn