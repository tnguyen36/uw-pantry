
export default (state = [0], action) => {
    switch (action.type) {
        case 'FETCH_CLASS_STANDINGS':
            return action.payload
        default:
            return state;
    }
}