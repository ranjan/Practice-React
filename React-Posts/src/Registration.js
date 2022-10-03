import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import DataContext from './context/DataContext';
import axios from "axios";


const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { UpdateAuth } = useContext(DataContext);  
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  
  const handleSubmit = (e) => {
    axios
      .post(
        "http://localhost:3500/registrations",
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          UpdateAuth(true, response.data.user)
          history.push('/')
        }
      })
      .catch(err => {
        setErrorMessage(`Error: ${err.message}`);
        console.log("registration error", err);
      });
    e.preventDefault();
  }

  return (
    <main className='NewPost'>  
      
      <p className="statusMsg" style={{ color: "red" }}>{errorMessage}</p>
      <form className="Form" onSubmit={handleSubmit}>      
        
        <label htmlFor="postName">Name:</label>
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="postEmail">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="postPassword">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="postCPassword">Password Confirmation:</label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="PassworConfirmation"
            value={passwordConfirmation}
            onChange={(e) => {setPasswordConfirmation(e.target.value)}}
            required
          />

          <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Registration;