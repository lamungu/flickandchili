import { combineReducers } from 'redux';
import movies from './movies';
import user from './user';
import { routerReducer } from 'react-router-redux';

/**
 * In this Master Reducer, we combine all of the smaller
 * reducers to have one giant source of truth. at the
 * end, we include the React Router reducer, which
 * allows us to track browser location changes
 * as a state action in the Redux structure.
 */
export default combineReducers({
    movies,
    user,
    routing: routerReducer
});