import * as types from './actionTypes';
import {createSession, getMovieList, deleteListItem, createListItem, getUser} from '../../api';

function moviesFetched(movies) {
    return {
        type: types.MOVIES_FETCHED,
        movies
    };
}
function movieAdded(movie) {
    return {
        type: types.MOVIE_ADDED,
        movie
    };
}
function movieRemoved(movieId) {
    return {
        type: types.MOVIE_REMOVED,
        movieId
    };
}


export const fetchMovies = () => ((dispatch, getState) => {
    const {user} = getState();
    getMovieList(LIST_ID, user.sessionId).then(({data}) => {
        dispatch(moviesFetched(data.items));
    });
});

export const removeMovieFromList = (movieId) => ((dispatch, getState) => {
    const {user} = getState();
    deleteListItem(LIST_ID, movieId, user.sessionId).then(() => {
        dispatch(movieRemoved(movieId))
    })
});

export const addMovieToList = (movie) => ((dispatch, getState) => {
    const {user} = getState();
    createListItem(LIST_ID, movie.id, user.sessionId).then(() => {
        dispatch(movieAdded(movie));
    })
});

export const addToFavorites = (movieId) => ((dispatch, getState) => {
});


///REQUIRED TO MAKE AUTH WORK

const LIST_ID = 63580;

/*
Use this code if you want your own list Id
getAccountLists(user.id, user.sessionId).then(({data}) => {
    let {results} = data;
    if (results.length > 0) {
        getMovieList(results[0]['id'], user.sessionId).then(({data}) => {
            dispatch(moviesFetched(data.items));
        });
    } else {
        //fail
    }
});
*/

export const fetchSessionId = (requestToken) => (dispatch => {
    createSession(requestToken).then(({data}) => {
        let {session_id} = data;
        getUser(session_id).then((response) => {
            dispatch(userFetched(response.data));
            dispatch(sessionFetched(session_id));
        });
    });
});
function sessionFetched(sessionId) {
    return {
        type: types.SESSION_FETCHED,
        sessionId
    };
}
function userFetched(user) {
    return {
        type: types.USER_FETCHED,
        user
    };
}
