import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [Authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    const UpdateAuth = (authenticated, user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('Authenticated', authenticated);
      // setAuthenticated(authenticated);
      // setUser(user);
    }

    const isAuthenticated = () => {
      if (localStorage.getItem('Authenticated')){
        return true
      }
      return false
    }

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts,
            Authenticated, setAuthenticated, setUser, user, 
            UpdateAuth, isAuthenticated
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;