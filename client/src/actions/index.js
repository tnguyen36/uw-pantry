import axios from 'axios';




export const createUser = (formValues) => async dispatch => {   
    const response = await axios.post('/users', formValues);
    console.log(response);
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

export const fetchDailyUsers = () => async dispatch => {
    const response = await axios.get('/users/daily');
    dispatch({type: 'FETCH_DAILY_USERS', payload: response.data.length});
}

export const fetchClassStandings = () => async dispatch => {
    const response = await axios.get('/users/class');
    console.log(response.data);
    dispatch({type: 'FETCH_CLASS_STANDINGS', payload: response.data});
}

export const fetchDateGroups = () => async dispatch => {
    const response = await axios.get('/users/dates');
    dispatch({type: 'FETCH_DATE_GROUPS', payload: response.data});
}

export const fetchEthnicityGroups = () => async dispatch => {
    const response = await axios.get('/users/ethnicity');
    dispatch({type: 'FETCH_ETHNICITIES_GROUPS', payload: response.data})
}

export const offSnackBar = () => {
    return {
        type: 'OFF_SNACKBAR'
       
    }
}

export const handleDrawer = (drawerStatus) => {
    if (drawerStatus) {
        return {
            type: 'CLOSE_DRAWER',           
        }
    } else {
        return {
        type: 'OPEN_DRAWER'
        }
    }   
}

export const setItemIndex = (index) => {
    return {
        type: 'SET_INDEX',
        payload: index
    }
}

export const transferUser = (users) => async dispatch => {
    const userIds = users.map(user => user._id);
    const response = await axios.post('/users/transfer', userIds);
    dispatch({type: 'UPDATE_USERS', payload: response.data});
    
}


