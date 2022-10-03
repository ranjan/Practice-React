import Feed from './Posts/Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);
    const { search, setSearch } = useContext(DataContext);

    return (
      <main className="Home">
        <div style={{float: "right"}}>
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Posts</label>
          <input
            id="search"
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{width: "unset"}}
          />
        </form>
        </div>
        {isLoading && <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
      </main>
    )
}

export default Home
