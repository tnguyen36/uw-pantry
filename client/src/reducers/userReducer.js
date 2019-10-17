import _ from 'lodash';

export default (state={}, action) => {
    switch(action.type) {
        case 'CREATE_USER':
            return {...state, [action.payload._id]: action.payload};
        case 'FETCH_USERS':
            return {...state, ..._.mapKeys(action.payload, '_id')};
        default:
            return state;
    }
}