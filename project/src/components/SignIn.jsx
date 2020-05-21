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
import { UserContext, userInfo } from './user-context.js';

const URL = "http://localhost:5000/signin";

class SignIn extends Component {
 
  constructor(props) {
    super(props)
    this.state = {username: '', password: '', updateLogIn: this.props.updateLogIn}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   }

   componentDidMount() {
   }

   
   handleSubmit(event){
    const userInfo = this.context
    axios.post(URL,
        {
            username: this.state.username,
            password: this.state.password
         },
        {withCredentials: false})
        .then( res => {
            if(res.data.result.success == "true"){
                console.log("login", res);
                console.log("alpha during signin", res.data.result.alpha_coins)
                this.props.updateLogIn(res.data.result.success,res.data.result.type, res.data.result.username, res.data.result.user_id, res.data.result.account_balance,res.data.result.alpha_coins)
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
    if (this.props.isLogged) {
      // redirect to home if logged in
      return <Redirect to = {{ pathname: "/profile" }} />;
    }
    return (
        <div>
            <NavBar type={this.props.type} isLogged={this.props.isLogged} userBalance={this.props.balance} id = {this.props.id} alphaCoins = {this.props.alphaCoins}/>
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
        </div>
      );
  }
}

export default SignIn