import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    form: formReducer,
    users: userReducer,
    error: errorReducer
});