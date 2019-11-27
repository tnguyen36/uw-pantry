import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import returningUserReducer from './returningUserReducer';
import errorReducer from './errorReducer';
import classStandingReducer from './classStandingReducer';
import dateGroupsReducer from './dateGroupsReducer';
import ethnicityReducer from './ethnicityReducer';
import dailyUserReducer from './dailyUserReducer';
import handleDrawerReducer from './handleDrawerReducer';
import selectItemReducer from './selectItemReducer';
import inventoryReducer from './inventoryReducer';
import positiveDailyReducer from './dailyPositiveInventoryReducer';
import negativeDailyReducer from './dailyNegativeInventoryReducer';
import signInReducer from './signInReducer';


export default combineReducers({
    form: formReducer,
    users: userReducer,
    returningUsers: returningUserReducer,
    error: errorReducer,
    classStandings: classStandingReducer,
    dateGroups: dateGroupsReducer,
    ethnicities: ethnicityReducer,
    dailyUsers: dailyUserReducer,
    handleDrawer: handleDrawerReducer,
    itemIndex: selectItemReducer,
    inventory: inventoryReducer,
    positiveDaily: positiveDailyReducer,
    negativeDaily: negativeDailyReducer,
    signIn: signInReducer
   
});