import axios from 'axios';



export const createUser = (formValues) => async dispatch => {   
    const response = await axios.post('/users', formValues);
    if (response.data.errors) {
        dispatch({type: 'ERROR_SNACKBAR'});
    } else {
        dispatch({type: 'CREATE_USER', payload: response.data});
        dispatch({type: 'SUCCESS_SNACKBAR'});
    }   
};

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('/users');
    dispatch({type: 'FETCH_USERS', payload: response.data});
};

export const offSnackBar = () => {
    return {
        type: 'OFF_SNACKBAR'
       
    }
}

