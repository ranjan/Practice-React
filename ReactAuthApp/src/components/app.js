import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import axios from 'axios';
//import { response } from 'express';

export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loggedInStatus: "Not Logged In",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "Not Logged In",
      user: {}
    })
  }

  checkLoginStatus(){
    axios.get("http://localhost:3001/logged_in", {withCredentials: true}).then(response => {
      if(response.data.logged_in){
        this.setState({
          loggedInStatus: "Logged In",
          user: response.data.user
        })
      } else if(!response.data.logged_in){
        this.setState({
          loggedInStatus: "Not Logged In",
          user: {}
        })
      }
    }).catch(error => {
      console.log("Error", error)
    })
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "Logged In"
    })
  }
  
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
          <Route 
          exact 
          path={"/"} 
          render={props => (
            <Home {...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
          )}
          />

          <Route 
          exact 
          path={"/dashboard"} 
          render={props => (
            <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
          )}
          />
        </Switch>
        
        </BrowserRouter>
      </div>
    );
  }
}
