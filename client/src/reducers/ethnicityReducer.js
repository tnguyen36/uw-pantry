const INITIAL_STATE = [
    {_id: 'N/A', total: 0}
]

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_ETHNICITIES_GROUPS':
            return action.payload
        default:
            return state
    }
}