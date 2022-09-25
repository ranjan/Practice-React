import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state= {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateErrorMessage(data){
    this.setState({
      registrationErrors: `${data}`
    })
  }

  handleSubmit(event){
     axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
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
      <div>
        <h1>Registration</h1>
        <h1>{!!(this.state.registrationErrors)?this.state.registrationErrors: this.state.registrationErrors}</h1>

        <br/><br/>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />
          
          <br/><br/>
          <label>Password</label>
          <input type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />

          <br/><br/>
          <label>Password Confirmation</label>
          <input type="password" name="password_confirmation" placeholder='Password Confirmation' value={this.state.password_confirmation} onChange={this.handleChange} required />
          
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
