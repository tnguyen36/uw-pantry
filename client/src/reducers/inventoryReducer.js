

export default (state=[], action) => {
    switch(action.type) {
        case 'CREATE_INVENTORY_POST':
            return [...state, action.payload];
        case 'FETCH_INVENTORY_POSTS':
            return action.payload;
        case 'DELETE_INVENTORY_POSTS':
            return state.filter(element => !action.payload.includes(element._id));
        default:
            return state;
    }
}