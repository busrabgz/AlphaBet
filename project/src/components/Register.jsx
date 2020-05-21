import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const URL = "http://localhost:5000/register";

class Register extends Component {
  constructor() {
    super()
    this.state = {username: "", password: "", forename: "", surname: "", email: "", type: "user", signed_up: false}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
   }

   handleSubmit(event){
    axios.post(URL,
        {
            username: this.state.username,
            password: this.state.password,
            confirm_password: this.state.password,
            forename: this.state.forename,
            surname: this.state.surname,
            email: this.state.email,
            type: this.state.type
         },
         {credentials: 'include'})
        .then( res => {
            if(res.data.result.success == "true"){
                console.log("registration", res);
                this.setState({ signed_up: true });
                }
            })
         .catch(error => {
            console.log("reg error", error);
            });
    event.preventDefault();
   }

   handleChange(event) {
       this.setState({
        [event.target.name]: event.target.value
       });
   }

  render() {
    if (this.state.signed_up) {
      return <Redirect to = {{ pathname: "/" }} />;
    }
    return (<div>
        <NavBar type={this.props.type} id = {this.props.id} isLogged={this.props.userSuccess} userBalance={this.props.balance} alphaCoins = {this.props.alphaCoins}/>
        <h1>Register Page</h1>
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

            <input
                type="password"
                name = "password_confirmation"
                placeholder="Password confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
            />

            <input
                type="forename"
                name = "forename"
                placeholder="Forename"
                value={this.state.forename}
                onChange={this.handleChange}
                required
            />

            <input
                type="surname"
                name = "surname"
                placeholder="Surname"
                value={this.state.surname}
                onChange={this.handleChange}
                required
            />

            <input
                type="email"
                name = "email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
            />

            <FormControl component="fieldset">
              <RadioGroup aria-label="type" name="type" value={this.state.type} onChange={this.handleChange}>
                <FormControlLabel value="user" defaultChecked="true" control={<Radio />} label="User" />
                <FormControlLabel value="editor" control={<Radio />} label="Editor" />
              </RadioGroup>
            </FormControl>

            <button type="submit">Register</button>
        </form>
    </div>);
  }
}

export default Register