const INITIAL_STATE = {
    toggleSnackBar: false,
    variant: null,
    description: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ERROR_SNACKBAR':
            return {...state, toggleSnackBar: true, variant: 'error', description: action.payload}
        case 'SUCCESS_SNACKBAR':
            return {...state, toggleSnackBar: true, variant: 'success', description: action.payload}
        case 'OFF_SNACKBAR':
            return {...state, toggleSnackBar: false, description: null}
        default:
            return state
    }
}