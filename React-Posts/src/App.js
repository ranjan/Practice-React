import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import Login from './Login';
import About from './About';
import Registration from './Registration';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <div className="App">
      <DataProvider>
      <Header title="Blog" />
        <Nav />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <PrivateRoute component={Home} path="/" exact />
          <PrivateRoute exact path="/post/new" component={NewPost} />
          <PrivateRoute path="/edit/:id" component={EditPost} />
          <PrivateRoute path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
