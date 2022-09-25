import React, { Component } from 'react';
import Registration from './auth/Registration';
import axios from 'axios';

export default class Home extends Component {
  constructor(){
    super();
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/dashboard")
  }

  handleLoginClick(){
    this.props.history.push("/login")
  }

  handleLogoutClick(){
    axios.delete("http://localhost:3001/logout", {withCredentials: true}).then(response => {
      this.props.handleLogout();
    }).catch(error => {
      console.log("Logged out");
    })
    
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <button onClick={() => this.handleLoginClick()}>Login</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}
