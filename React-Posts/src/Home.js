import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);
    const { search, setSearch } = useContext(DataContext);

    return (
      <main className="Home">
        Dashboard
      </main>
    )
}

export default Home
