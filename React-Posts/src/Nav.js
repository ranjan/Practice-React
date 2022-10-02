import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    const { search, setSearch } = useContext(DataContext);
    const { LoggedInStatus, setLoggedInStatus } = useContext(DataContext);
    const history = useHistory();

    const handleLogoutClick = () => {
      axios
        .delete("http://localhost:3500/logout", { withCredentials: true })
        .then(response => {
          setLoggedInStatus('LoggedOut');
        })
        .catch(error => {
          console.log("logout error", error);
        });
      history.push('/login');
    }

    const SignInLink = () => {
      if (LoggedInStatus == "LoggedIn"){
        return (<Link onClick={() => handleLogoutClick()}>Logout</Link>);
      } else{
        return <li><Link to="/login">Login</Link></li>
      }
    }

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
                <li>{ SignInLink() }</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
