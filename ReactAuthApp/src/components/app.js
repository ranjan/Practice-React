import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Login from './auth/Login';
import axios from 'axios';

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loggedInStatus: "Not Logged In",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
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
          loggedInStatus: "LoggedIn",
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

  handleSuccessfulAuth(data){
    this.handleLogin(data);
    this.props.history.push("/dashboard")
    history.go();
  }

  handleLogin(){
    this.setState({
      loggedInStatus: "LoggedIn"
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
          path={"/login"} 
          render={props => (
            <Login {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedInStatus={this.state.loggedInStatus} />
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

export default withRouter(App)
