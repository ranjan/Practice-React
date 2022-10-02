import Feed from './Feed';
import { useRef, useEffect, useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
    const { searchResults, fetchError, isLoading, setShowSearch } = useContext(DataContext);
    const mounted = useRef(false);

    useEffect(() => {
       setShowSearch(true);
       mounted.current = true;
       return () => { setShowSearch(false); mounted.current = false; };
    }, []);

    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home
