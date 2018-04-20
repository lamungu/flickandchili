import * as types from './actionTypes';
import {createSession, getMovieList, deleteListItem, createListItem, getUser} from '../../api';

export function movieOpened(movie) {
    return dispatch => (
        dispatch(
            {
                type: types.MOVIE_OPENED,
                movie: {
                    id: movie.id,
                    title: movie.title
                }
            }
        )
    );
}

export function movieClosed(movieId) {
    return dispatch => (dispatch({type: types.MOVIE_CLOSED, movieId}));
}

