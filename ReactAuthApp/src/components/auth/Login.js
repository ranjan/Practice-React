import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateErrorMessage(data){
    this.setState({
      loginErrors: `${data}`
    })
  }

  componentDidUpdate(){
    if (this.props.loggedInStatus == 'LoggedIn'){
      this.props.history.push("/dashboard");
    }
  }
  
  handleSubmit(event){
     axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: this.state.email,
            password: this.state.password,
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response.data)
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        } else if(response.data.status === 401) {
          this.updateErrorMessage("Error: Invalid Credential");
        }
      })
      .catch(error => {
        this.updateErrorMessage(error);
      });

    event.preventDefault();
  }
  
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return (
      <div className={`home h-100 d-flex align-items-center justify-content-center`}>
        <div  style={{ backgroundColor: "yellow", height: "100%" }}>
        <h1>Login</h1>
        { <h2>Status: {this.props.loggedInStatus}</h2> }
        <h1>{!!(this.state.loginErrors)?this.state.loginErrors: this.state.loginErrors}</h1>

        <br/><br/>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />
          
          <br/><br/>
          <label>Password</label>
          <input type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />

          
          <button type='submit'>Login</button>
        </form>
      </div>
      </div>
    );
  }
}
