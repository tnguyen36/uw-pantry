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

export const fetchClassStandings = (quarter = 0) => async dispatch => {

    const response = await axios.post('/users/class', {quarter: quarter});
    if(response.data.length === 0) {
        response.data = [{_id: 'N/A', total: 0}]
    }
    dispatch({type: 'FETCH_CLASS_STANDINGS', payload: response.data});
}

export const fetchDateGroups = () => async dispatch => {
    const response = await axios.get('/users/dates');
    dispatch({type: 'FETCH_DATE_GROUPS', payload: response.data});
}

export const fetchEthnicityGroups = (quarter = 0) => async dispatch => {
    const response = await axios.post('/users/ethnicity', {quarter: quarter});
    if(response.data.length === 0) {
        response.data = [{_id: 'N/A', total: 0}]
    }
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

export const createInventoyPost = (weight, operator) => async dispatch => {
    const data = {weight, operator}
    const response = await axios.post("/inventory", data);
    dispatch({type: 'CREATE_INVENTORY_POST', payload: response.data})
}

export const fetchInventoryPosts = () => async dispatch => {
    const response = await axios.get("/inventory");
    dispatch({type: 'FETCH_INVENTORY_POSTS', payload: response.data});
}

export const deleteInventoryPost = (posts) => async dispatch => {
    const postIds = posts.map(post => post._id);
    await axios.post("/inventory/delete", postIds);
    dispatch({type: 'DELETE_INVENTORY_POSTS', payload: postIds});

}

export const fetchPositiveDailyInventory = () => async dispatch => {
    const response = await axios.get("/inventory/daily/positive");
    dispatch({type: 'FETCH_POSITIVE_DAILY', payload: response.data});
}

export const fetchNegativeDailyInventory = () => async dispatch => {
    const response = await axios.get("/inventory/daily/negative");
    dispatch({type: 'FETCH_NEGATIVE_DAILY', payload: response.data});
}


