import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loggedInStatus: "Not Logged",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
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
            <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
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
