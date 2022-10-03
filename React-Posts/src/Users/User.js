import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const User = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState('');
 
  async function fetchData() {
    let data = null
    try {
      const response = await axios.get('http://localhost:3500/users');
      if (response.data.status === 401){
        setErrorMessage("Error: Unautorized");
      }else{
        data = response.data
      }
    } catch (err) {
      setErrorMessage(`Error: ${err.message}`);
    }
    setUsers(data);
  }

  useEffect(  () => {
    fetchData();
  }, [])

  return (
    <main>
      {users && users.map(user => (
          <p key={user.id}>{user.name}</p>
      ))}    
    </main> 
  )
}

export default User;
