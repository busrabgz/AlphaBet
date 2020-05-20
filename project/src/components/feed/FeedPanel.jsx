import React, { Component } from 'react'
import {UserContext} from '../user-context';
import SingleFeed from './SingleFeed.jsx'

const divStyle = {
  float: "left",
  width: "calc(95% - 25em)",
  marginLeft: "15px",
  };

class FeedPanel extends Component {
  constructor(props){
    super(props)
    this.state={
      users: this.props.users
    }
  }

  componentDidMount(){
    this.setState({
      users: this.props.users
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.users != this.props.users){
      this.setState({
        users: this.props.users
      })
    } 
  }

  render() {
    return (
    <UserContext.Consumer>
    { ( {username, balance, updateBalance} ) => (
        <div style={divStyle}>
            <h1>Feeds will be shown here</h1>
            {this.state.users.map( user => {
            { 
              const temp = []
              for(let i = 0; i < user.bet_slips.length; i++){
                temp[i] = <SingleFeed userSuccess={this.props.userSuccess} id={this.props.id} username={user.username} bet_slip={user.bet_slips[i]}/>
              }
              return temp
            }})}
        </div>
         )}
     </UserContext.Consumer>);
  }
}

export default FeedPanel