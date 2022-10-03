import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { useHistory, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    const { setUser, isAuthenticated, setAuthenticated } = useContext(DataContext);
    const history = useHistory();

    const handleLogoutClick = () => {
      axios
        .delete("http://localhost:3500/logout", { withCredentials: true })
        .then(response => {})
        .catch(error => { console.log(`Error Occured: ${error.message}`) });
      setAuthenticated(false);
      localStorage.clear();
      setUser({});
      history.push('/login');
    }

    return (
        <nav className="Nav">
            <ul>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/post/new">Post</NavLink></li>
              <li><NavLink to="/users">User</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              {isAuthenticated() ? (
                <li><Link to="#" onClick={() => handleLogoutClick()}>Logout</Link></li>
              ) : (
                <li><NavLink to="/login">Login</NavLink></li>
              )}
            </ul>
        </nav>
    )
}

export default Nav
