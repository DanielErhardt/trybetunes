import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

import Header from './components/Header';
import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
      isUserLogged: false,
      handleUserSubmit: this.handleUserSubmit,
      handleInputChange: this.handleInputChange,
    };
  }

  handleUserSubmit = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({
      isLoading: false,
      isUserLogged: true,
    });
  }

  handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { isUserLogged, isLoading } = this.state;
    return (
      <section>
        { isLoading ? <Loading /> : <Header />}
        <Switch>
          { isUserLogged ? (
            <Redirect to="/search" />
          ) : (
            <Route
              exact
              path="/"
              render={ () => (
                <Login
                  { ...this.state }
                />
              ) }
            />
          )}

          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </section>
    );
  }
}

export default App;
