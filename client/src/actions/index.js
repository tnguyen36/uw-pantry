import axios from 'axios';



export const createUser = (formValues) => async dispatch => {   
    const response = await axios.post('/users', formValues);
    console.log(response);
    dispatch({type: 'CREATE_USER', payload: response.data});   
};

