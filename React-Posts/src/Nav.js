import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import DataContext from './context/DataContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    const { showSearch, setUser, search, setSearch, Authenticated, setAuthenticated } = useContext(DataContext);
    const history = useHistory();

    const handleLogoutClick = () => {
      axios
        .delete("http://localhost:3500/logout", { withCredentials: true })
        .then(response => {})
        .catch(error => {
          console.log(`Error Occured: ${error.message}`)
        });
      setAuthenticated(false);
      localStorage.clear();
      history.push('/login');
    }

    useEffect(() => {
      const user_obj = localStorage.getItem("user");
      if (user_obj) {
        setUser(user_obj);
        setAuthenticated(true);
      } 
    }, []);

    return (
        <nav className="Nav">
            <ul>
              {Authenticated ? (
                <li><Link onClick={() => handleLogoutClick()}>Logout</Link></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/post">Post</Link></li>
              <li><Link to="/about">About</Link></li>
              {showSearch ?
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
           : '' }
            </ul>
        </nav>
    )
}

export default Nav
