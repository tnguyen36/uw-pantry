const INITIAL_STATE = {
    toggleSnackBar: false,
    variant: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ERROR_SNACKBAR':
            return {...state, toggleSnackBar: true, variant: 'error'}
        case 'SUCCESS_SNACKBAR':
            return {...state, toggleSnackBar: true, variant: 'success'}
        case 'OFF_SNACKBAR':
            return {...state, toggleSnackBar: false}
        default:
            return state
    }
}