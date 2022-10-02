import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { LoggedInStatus, setLoggedInStatus } = useContext(DataContext);
  const { user, setUser } = useContext(DataContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUser = { user: {email: email, password: password} };

    try {
        const response = await api.post('/sessions', loginUser);
        if (response.data.status === 401){
          setLoggedInStatus('LoggedOut');
          setErrorMessage("Error: Unautorized");
          setUser({});
          localStorage.setItem('user', {});
          localStorage.setItem('LoggedInStatus', 'LoggedOut');
          
        }else{
          setLoggedInStatus('LoggedIn');
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('LoggedInStatus', 'LoggedIn');
          history.push('/');
        }
    } catch (err) {
        setLoggedInStatus('LoggedOut');
        setErrorMessage(`Error: ${err.message}`);
        localStorage.setItem('user', {});
        localStorage.setItem('LoggedInStatus', 'LoggedOut');
    }
  }

  useEffect(() => {
    const user_obj = localStorage.getItem("user");
    if (user_obj) {
      setUser(user_obj);
      setLoggedInStatus('LoggedIn');
    } 
   }, []);

  return (
      <main className='NewPost'>
        <div>
          <div className="InnerNav">
            <ul>
              <li><h1>Login</h1></li> 
              <li style={{ float: "right" }}>{LoggedInStatus}</li>
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
