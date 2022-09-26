import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Registration from './auth/Registration';
import axios from 'axios';


class Home extends Component {
  constructor(){
    super();
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/dashboard")
  }

  handleLogoutClick(){
    axios.delete("http://localhost:3001/logout", {withCredentials: true}).then(response => {
      this.props.handleLogout();
    }).catch(error => {
      console.log("Logged out");
    })
    
  }

  render() {
    var loginButton;
    console.log(this.props.loggedInStatus);
    if (this.props.loggedInStatus != 'LoggedIn') {
      loginButton = <button onClick={() => this.props.history.push("/login")}>Login</button>;
    }else{
      loginButton = <button onClick={() => this.handleLogoutClick()}>Logout</button>;
    }

    return (
      <div className={`home h-100 d-flex align-items-center justify-content-center`}>
        <div  style={{ backgroundColor: "yellow", height: "100%" }}>
          <h1>Home</h1>
          <h2>Status: {this.props.loggedInStatus}</h2>
          {loginButton}
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        </div>
      
      </div>
    );
  }
}

export default withRouter (Home);
