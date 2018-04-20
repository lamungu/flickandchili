import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as userSelectors from '../reducers/user';
import {fetchMovies} from '../reducers/user/actions';
import List from '../components/List';

class MyMovies extends Component {
  render() {
      return (
          <section className="section">
              <div className="container">
                  <h1 className="title">
                      My Movies
                  </h1>
                  <List own={true} movies={this.props.movies}/>
              </div>
          </section>
      );
  }

  componentDidMount() {
      if (!this.props.movies) {
          this.props.loadMovies();
      }
  }
}

const mapStateToProps = (state) => ({
    movies: userSelectors.getMovies(state)
});
const mapDispatchToProps = (dispatch) => ({
    loadMovies() {
        dispatch(fetchMovies());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMovies);
