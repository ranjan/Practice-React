import { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import api from './../api/posts';
import DataContext from './../context/DataContext';

const Login = () => {
  const { UpdateAuth, isAuthenticated } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUser = { user: {email: email, password: password} };

    try {
        const response = await api.post('/sessions', loginUser);
        if (response.data.status === 401){
          setErrorMessage("Error: Unautorized");
          UpdateAuth(false, {})
          
        }else{
          UpdateAuth(true, response.data.user)
          history.push('/');
        }
    } catch (err) {
        setErrorMessage(`Error: ${err.message}`);
        UpdateAuth(false, {})
    }
  }

  return (
      <main className='NewPost'>
        <div>
          <div className="InnerNav">
            <ul>
              <li><h1>Login</h1></li> 
              <li style={{ float: "right" }}>{isAuthenticated() ? "Logged In" : "Logged Out"}</li>
            </ul>
          </div>
          <div>  
            <p className="statusMsg" style={{ color: "red" }}>{errorMessage}</p>
            <form className="Form" onSubmit={handleSubmit}>
              <label htmlFor="postEmail">Email:</label>
              <input
                  id="postEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="postPassword">Password:</label>
              <input
                  id="postPassword"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div style={{"text-align": "center"}}><Link to="/registration">Register</Link></div>
        </div>
        
      </main>
  )
}

export default Login
