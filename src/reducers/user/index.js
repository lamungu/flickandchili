import * as types from './actionTypes';

const initialState = {
    sessionId: '',
    information: '',
    movies: '',
};
const user = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_FETCHED:
            return {
                ...state,
                sessionId: action.sessionId
            };
        case types.USER_FETCHED:
            return {
                ...state,
                user: action.user
            };
        case types.MOVIES_FETCHED:
            return {
                ...state,
                movies: action.movies
            };
        case types.MOVIE_ADDED:
            return {
                ...state,
                movies: state.movies.concat([action.movie])
            };
        case types.MOVIE_REMOVED:
            return {
                ...state,
                movies: state.movies.filter(movie => (parseInt(movie.id) !== parseInt(action.movieId)))
            };
        default:
            return state
    }
};

export const getSessionId = (state) => {
    return state.user.sessionId;
};
export const getUser = (state) => {
    return state.user.information;
};

export const getMovies = (state) => {
    return state.user.movies
};

export const getMovie = (movieId, state) => {
    return state.user.movies !== '' ? state.user.movies.find(movie => (movie.id === movieId)) : false;
};

export default user