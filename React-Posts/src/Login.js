import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';

const Login = () => {
  const { Authenticated, setAuthenticated, setUser } = useContext(DataContext);
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
          setAuthenticated(false);
          setErrorMessage("Error: Unautorized");
          setUser({});
          localStorage.setItem('user', {});
          localStorage.setItem('Authenticated', false);
          
        }else{
          setAuthenticated(true);
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem(Authenticated, true);
          history.push('/');
        }
    } catch (err) {
        setAuthenticated(false);
        setErrorMessage(`Error: ${err.message}`);
        localStorage.setItem('user', {});
        localStorage.setItem('Authenticated', false);
    }
  }

  useEffect(() => {
    const user_obj = localStorage.getItem("user");
    if (user_obj) {
      setUser(user_obj);
      setAuthenticated(true);
    } 
   }, []);

  return (
      <main className='NewPost'>
        <div>
          <div className="InnerNav">
            <ul>
              <li><h1>Login</h1></li> 
              <li style={{ float: "right" }}>{Authenticated ? "Logged In" : "Logged Out"}</li>
            </ul>
          </div>
          <div>  
            <p className="statusMsg" style={{ color: "red" }}>{errorMessage}</p>
            <form className="loginForm" onSubmit={handleSubmit}>
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
        </div>
      </main>
  )
}

export default Login
