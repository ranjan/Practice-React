import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './../context/DataContext';
import { Link } from 'react-router-dom';

const Posts = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);
    const { search, setSearch } = useContext(DataContext);

    return (
      <main className="Home">
        <div class="container">
          <div class="row">
            <div className="col-xs-8 col-sm-8 col-md-8">
              <form className="searchForm" style={{float: "right"}} onSubmit={(e) => e.preventDefault()}>
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
            <div className="col-xs-4 col-sm-4 col-md-4 jumbotron d-flex align-items-center justify-content-end">
            <Link to={'/post/new'}><button className="editButton">New Post</button></Link>
            </div>
          </div>
        </div>
        
        
        {isLoading && <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
      </main>
    )
}

export default Posts
