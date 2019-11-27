import _ from 'lodash';

export default (state={}, action) => {
    switch(action.type) {
        case 'CREATE_RETURNING_USER':
            return {...state, [action.payload._id]: action.payload};
        case 'FETCH_RETURNING_USERS':
            return _.mapKeys(action.payload, '_id');
        case 'UPDATE_RETURNING_USERS':
            return {...state, ..._.mapKeys(action.payload, '_id')};
        default:
            return state;
    }
}