import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import groupReducer from './groupReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    todoReducer,
    groupReducer,
    filterReducer
});