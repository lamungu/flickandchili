import axios from 'axios';

const API_KEY = 'acb239d81139e8a0bba9ef6032217377';

export function createRequestToken() {
    return axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=' + API_KEY);
}

export function createSession(requestToken) {
    return axios.get('https://api.themoviedb.org/3/authentication/session/new?api_key=' + API_KEY
        + '&request_token=' + requestToken);
}
export function getUser(sessionId) {
    return axios.get('https://api.themoviedb.org/3/account?api_key=' + API_KEY
        + '&session_id=' + sessionId);
}

export function login(username, password, requestToken) {
    return axios.get('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=' + API_KEY
        + '&username=' + username
        + '&password=' + password
        + '&request_token=' + requestToken);
}

export function getAccountLists(userId, sessionId) {
    return axios.get('https://api.themoviedb.org/3/account/' + userId + '/lists?api_key=' + API_KEY
        + '&session_id=' + sessionId);
}

export function getMovieList(listId, sessionId) {
    return axios.get('https://api.themoviedb.org/3/list/' + listId + '?api_key=' + API_KEY
        + '&session_id=' + sessionId);
}

export function findMovie(searchString) {
    return axios.get('https://api.themoviedb.org/3/search/movie?query=' + searchString + '&api_key=' + API_KEY);
}

export function getMovieDetails(movieId) {
    return axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY);
}

export function createListItem(listId, movieId, sessionId) {
    return axios.post('https://api.themoviedb.org/3/list/' + listId + '/add_item?api_key=' + API_KEY
        + '&session_id=' + sessionId, {media_id: movieId});
}

export function deleteListItem(listId, movieId, sessionId) {
    return axios.post('https://api.themoviedb.org/3/list/' + listId + '/remove_item?api_key=' + API_KEY
        + '&session_id=' + sessionId, {media_id: movieId});
}
