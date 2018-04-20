import React, { Component } from 'react';
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import './App.css';
import Login from './pages/Login';
import MyMovies from './pages/MyMovies';
import SearchMovies from './pages/SearchMovies';
import ViewMovie from './pages/ViewMovie';
import * as userSelectors from './reducers/user';
import * as movieSelectors from './reducers/movies';
import {fetchSessionId} from './reducers/user/actions';

class AppContainer extends Component {
  render() {
    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="/">
                    </NavLink>
                    {this.props.sessionId !== '' && (
                        <div className="navbar-menu">
                            <div className="navbar-end">
                                <NavLink className="navbar-item" to="/my-movies">My Movies</NavLink>
                                <NavLink className="navbar-item" to="/search">Search Movie</NavLink>
                            </div>
                        </div>
                    )}
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
            </nav>
            {this.props.sessionId === '' ? (
                <Login loadSession={this.props.loadSession}/>
            ) : (
                <div>
                    <div className="tabs" style={{marginBottom: '0'}}>
                        <ul>
                            {this.props.movieTabs.map(movie => (
                              <li key={movie.id}>
                                  <NavLink activeClassName="is-active" to={'/view-movie/' + movie.id}>{movie.title}</NavLink>
                              </li>
                            ))}
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/my-movies" component={MyMovies}/>
                        <Route path="/search" component={SearchMovies}/>
                        <Route path="/view-movie/:movieId" component={ViewMovie} />
                    </Switch>
                </div>
            )}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    sessionId: userSelectors.getSessionId(state),
    movieTabs: movieSelectors.getActiveTabs(state)
});
const mapDispatchToProps = (dispatch) => ({
    loadSession(requestToken) {
        dispatch(fetchSessionId(requestToken));
    }
});

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
export default App;