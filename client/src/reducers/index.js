import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import classStandingReducer from './classStandingReducer';
import dateGroupsReducer from './dateGroupsReducer';

export default combineReducers({
    form: formReducer,
    users: userReducer,
    error: errorReducer,
    classStandings: classStandingReducer,
    dateGroups: dateGroupsReducer
});