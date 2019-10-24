export default (state={}, action) => {
    switch (action.type) {
        case 'FETCH_ETHNICITIES_GROUPS':
            return action.payload
        default:
            return state
    }
}