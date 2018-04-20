import * as types from './actionTypes';
import _ from 'lodash';
const movies = (state = [], action) => {
    switch (action.type) {
        case types.MOVIE_OPENED:
            return _.uniqBy([
                ...state,
                action.movie
            ], 'id');
        case types.MOVIE_CLOSED:
            return state.filter(movieId => (movieId !== action.movieId));
        default:
            return state
    }
};

export function getActiveTabs(state) {
    return state.movies;
}

export default movies