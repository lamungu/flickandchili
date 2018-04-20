import React, { Component } from 'react';
import {removeMovieFromList, addMovieToList, addToFavorites} from '../reducers/user/actions'
import {connect} from 'react-redux';
import moment from 'moment';
import {movieOpened} from "../reducers/movies/actions";

class Movie extends Component {
    render() {
        let {movie, own, addMovie, openMovie, addToFavorites, deleteMovie} = this.props;
        return (
            <div className="column is-3">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-3by4">
                            <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4 is-size-6">{movie.title || movie.original_title} </p>
                                <p className="subtitle is-6">{moment(movie.release_date).format('YYYY')} - {movie.vote_average} ({movie.vote_count} votes)</p>
                            </div>
                        </div>

                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                            <a href="#">#css</a> <a href="#">#responsive</a>
                            <br/>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a onClick={openMovie} href="#" className="card-footer-item">View</a>
                        <a onClick={addToFavorites} className="card-footer-item">Favorite</a>
                        {own ? (
                            <a onClick={deleteMovie} className="card-footer-item">Delete</a>
                        ) : (
                            <a onClick={addMovie} className="card-footer-item">Add</a>
                        )}
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch, {movie}) => ({
    deleteMovie() {
        dispatch(removeMovieFromList(movie.id));
    },
    addMovie() {
        dispatch(addMovieToList(movie));
    },
    openMovie() {
        dispatch(movieOpened(movie));
    },
    addToFavorites() {
        dispatch(addToFavorites(movie.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
