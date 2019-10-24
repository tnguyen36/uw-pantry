export default (state={}, action) => {
    switch(action.type) {
        case 'FETCH_DAILY_USERS':
            return [action.payload]
        default:
            return state
    }
}