import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import DataContext from './context/DataContext';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);
    const { LoggedInStatus, setLoggedInStatus } = useContext(DataContext);
    const history = useHistory();
    const { user, setUser } = useContext(DataContext);


    const handleLogoutClick = () => {
      axios
        .delete("http://localhost:3500/logout", { withCredentials: true })
        .then(response => {
          setLoggedInStatus('LoggedOut');
          localStorage.clear();
        })
        .catch(error => {
          setLoggedInStatus('LoggedOut');
          localStorage.clear();
        });
      history.push('/login');
    }

    let login_status;

    useEffect(() => {
      const user_obj = localStorage.getItem("user");
      if (user_obj) {
        setUser(user_obj);
        setLoggedInStatus('LoggedIn');
      } 
     }, []);

    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
              {(LoggedInStatus == 'LoggedIn') ? (
                <li><Link onClick={() => handleLogoutClick()}>Logout</Link></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/post">Post</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
