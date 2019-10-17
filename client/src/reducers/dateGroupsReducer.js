const INITIAL_STATE = [
    {_id: 1, total: 0},
    {_id: 2, total: 0},
    {_id: 3, total: 0},
    {_id: 4, total: 0},
    {_id: 5, total: 0},
    {_id: 6, total: 0},
    {_id: 7, total: 0},
    {_id: 8, total: 0},
    {_id: 9, total: 0},
    {_id: 10, total: 0},
    {_id: 11, total: 0},
    {_id: 12, total: 0},
]



export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_DATE_GROUPS':
            return action.payload
        default:
            return state
    }
}