import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import classStandingReducer from './classStandingReducer';
import dateGroupsReducer from './dateGroupsReducer';
import ethnicityReducer from './ethnicityReducer';
import dailyUserReducer from './dailyUserReducer';
import handleDrawerReducer from './handleDrawerReducer';
import selectItemReducer from './selectItemReducer';

export default combineReducers({
    form: formReducer,
    users: userReducer,
    error: errorReducer,
    classStandings: classStandingReducer,
    dateGroups: dateGroupsReducer,
    ethnicities: ethnicityReducer,
    dailyUsers: dailyUserReducer,
    handleDrawer: handleDrawerReducer,
    itemIndex: selectItemReducer
});