import axios from 'axios';
import history from '../history';


export const onSignIn = (formValues) => async dispatch => {
    const response = await axios.post("/login", formValues);
    if (response.data.result) {
        localStorage.setItem('jwtToken', response.data.token);
        dispatch({type: 'SIGN_IN'});
        history.push("/dashboard");
        dispatch({type: 'SUCCESS_SNACKBAR', payload: 'Welcome Admin'});
    } else {
        dispatch({type: 'ERROR_SNACKBAR', payload: 'Invalid username/password'});
    }
}

export const onSignOut = () => async dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch({type: 'SIGN_OUT'});
    // dispatch({type: 'SUCCESS_SNACKBAR', payload: 'Successfully Log Out!'});
    dispatch({type: 'SET_INDEX', payload: 0});
 };

 export const verifyToken = (token) => async dispatch => {
     const response = await axios.post("/token", {token});
     if (response.data) {
         dispatch({type:'SIGN_IN'});
     } else {
         localStorage.removeItem('jwtToken');
         dispatch({type:'SIGN_OUT'});
     }
 }

export const createUser = (formValues) => async dispatch => {   
    const response = await axios.post('/users', formValues);
    if (response.data.errors) {
        dispatch({type: 'ERROR_SNACKBAR', payload: 'Student ID already in use'});
    } else {
        dispatch({type: 'CREATE_USER', payload: response.data});
        dispatch({type: 'SUCCESS_SNACKBAR', payload: 'Successfully Registered!'});
        setTimeout(() => history.push('/'), 1300);
    }   
};

export const createReturningUser = (formValues) => async dispatch => {
    const response = await axios.post('/users/returning', formValues);
    dispatch({type: 'CREATE_RETURNING_USER', payload: response.data});
    dispatch({type: 'SUCCESS_SNACKBAR', payload: 'Successfully Registered!'});
    setTimeout(() => history.push('/'), 1300);
}

export const fetchReturningUsers = () => async dispatch => {
    const response = await axios.get('/users/returning');
    dispatch({type: 'FETCH_RETURNING_USERS', payload: response.data})
}

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('/users');
    dispatch({type: 'FETCH_USERS', payload: response.data});
};

export const fetchDailyUsers = () => async dispatch => {
    const response = await axios.get('/users/daily');
    dispatch({type: 'FETCH_DAILY_USERS', payload: response.data.length});
}

export const fetchClassStandings = (startDate, endDate) => async dispatch => {
    const response = await axios.post('/users/class', {startDate, endDate});
    if(response.data.length === 0) {
        response.data = [{_id: 'N/A', total: 0}]
    }
    dispatch({type: 'FETCH_CLASS_STANDINGS', payload: response.data});
}

export const fetchDateGroups = () => async dispatch => {
    const response = await axios.get('/users/dates');
    dispatch({type: 'FETCH_DATE_GROUPS', payload: response.data});
}

export const fetchEthnicityGroups = (startDate, endDate) => async dispatch => {
    const response = await axios.post('/users/ethnicity', {startDate, endDate});
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

export const processOrder = (users) => async dispatch => {
    const userIds = users.map(user => user._id);
    const response = await axios.post('/users/process', userIds);
    dispatch({type: 'UPDATE_USERS', payload: response.data});
}

export const processReturningUserOrder = (users) => async dispatch => {
    const userIds = users.map(user => user._id);
    const response = await axios.post('/users/returning/process', userIds);
    dispatch({type: 'UPDATE_RETURNING_USERS', payload: response.data});
}

export const createInventoyPost = (weight, operator, name, currentWeight) => async dispatch => {
    const data = {weight, operator, name, currentWeight};
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

export const fetchPositiveDailyInventory = (startDate, endDate) => async dispatch => {
    const response = await axios.get("/inventory/daily/positive", {params: { startDate, endDate}});
    dispatch({type: 'FETCH_POSITIVE_DAILY', payload: response.data});
}

export const fetchNegativeDailyInventory = (startDate, endDate) => async dispatch => {
    const response = await axios.get("/inventory/daily/negative", {params: { startDate, endDate}});
    dispatch({type: 'FETCH_NEGATIVE_DAILY', payload: response.data});
}



