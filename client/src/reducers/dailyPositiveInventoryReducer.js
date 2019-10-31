const INITIAL_STATE = {
    sum: 0,
    day: 1
}

export default (state=[INITIAL_STATE], action) => {
    switch(action.type) {
        case 'FETCH_POSITIVE_DAILY':
            return action.payload;
        default:
            return state;
    }
}