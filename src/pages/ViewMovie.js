import React, { Component } from 'react';
import {connect} from 'react-redux';
import {matchPath} from 'react-router';
import {getMovieDetails} from "../api";
import * as userSelectors from "../reducers/user";
import * as movieSelectors from "../reducers/movies";
import {movieOpened} from "../reducers/movies/actions";

class ViewMovie extends Component {
  constructor() {
      super();
      this.state = {
          movie: '',
          inMyShows: false
      };

      this.loadMovie = this.loadMovie.bind(this)
  }
  render() {
      let {movie} = this.state;
    return !movie ? (
            <div>wait</div>
        ) : (
            <div>
                <section style={{backgroundSize: 'cover', backgroundImage: 'url(https://image.tmdb.org/t/p/w1280' + movie.backdrop_path + ')'}} className="hero is-primary is-large is-fullwidth">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                {movie.title}
                            </h1>
                            <h2 className="subtitle">
                                {movie.tagline}
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h1 className="title">
                            Overview
                        </h1>
                        <p>
                            {movie.overview}
                        </p>
                    </div>
                </section>
            </div>
        );
  }

  loadMovie(movieId) {
      if (!this.props.movie || parseInt(this.props.movie.id) !== parseInt(movieId)) {
          getMovieDetails(movieId).then(({data}) => {
              this.setState({
                  movie: data,
                  inMyShows: false
              });
              if (!this.props.movieTabs.find(movie => parseInt(movie.id) === parseInt(data.id))) {
                  this.props.openMovie(data);
              }
          });
      } else {
          this.setState({
              movie: this.props.movie,
              inMyShows: true
          });
          if (!this.props.movieTabs.find(movie => parseInt(movie.id) === parseInt(this.props.movie.id))) {
              this.props.openMovie(this.props.movie);
          }
      }
  }

  componentDidMount() {
      this.loadMovie(this.props.match.params.movieId);

      this.locationUnlisten = this.props.history.listen(({pathname}) => {
          let match = matchPath(pathname, {path:'/view-movie/:movieId'});
          if (match && parseInt(match.params.movieId) !== parseInt(this.props.match.params.movieId)) {
              this.loadMovie(match.params.movieId);
          }
      });
  }
  componentWillUnmount() {
      this.locationUnlisten();
  }
}

const mapStateToProps = (state, {match}) => ({
    movie: userSelectors.getMovie(parseInt(match.params.movieId), state),
    movieTabs: movieSelectors.getActiveTabs(state)
});
const mapDispatchToProps = (dispatch) => ({
    openMovie(movie) {
        dispatch(movieOpened(movie));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewMovie);
