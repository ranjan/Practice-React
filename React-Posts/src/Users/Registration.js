import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import DataContext from './../context/DataContext';
import axios from "axios";

const Registration = () => {
  const { UpdateAuth } = useContext(DataContext);  
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const [inputField , setInputField] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const inputsHandler = (e) =>{
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));  
  }
  
  const handleSubmit = (e) => {
    console.log(inputField)
    axios
      .post(
        "http://localhost:3500/registrations",
        {
          user: inputField
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
            value={inputField.name}
            onChange={inputsHandler} 
            required
          />

          <label htmlFor="postEmail">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputField.email}
            onChange={inputsHandler}
            required
          />

          <label htmlFor="postPassword">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputField.password}
            onChange={inputsHandler}
            required
          />

          <label htmlFor="postCPassword">Password Confirmation:</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={inputField.password_confirmation}
            onChange={inputsHandler}
            required
          />

          <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Registration;