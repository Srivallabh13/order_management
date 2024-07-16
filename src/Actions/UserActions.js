import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, CLEAR_ERRORS, USERS_ORDER_REQUEST, USERS_ORDER_SUCCESS, USERS_ORDER_FAIL, USERS_BY_ID_REQUEST, USERS_BY_ID_SUCCESS, USERS_BY_ID_FAIL } from "../Constants/UserConstants";


export const getUser = () => async(dispatch)=> {
    try {
        dispatch({
            type:USER_REQUEST
        })
        var token = localStorage.getItem('jwt');
        console.log(token);
        if(token!=null) {
            const { data } = await axios.get('/Account', {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
            dispatch({
                type:USER_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type:USER_SUCCESS,
                payload: null
            })
        }
    } catch (error) {
        dispatch({
            type:USER_FAIL,
            payload: error
        }) 
    }
}
export const LoginUser = (formData) => async(dispatch)=> {
    try {
        dispatch({
            type:LOGIN_REQUEST
        })

        const {data} = await axios.post('Account/login', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          localStorage.setItem('jwt', data.token);

        dispatch({
            type:LOGIN_SUCCESS,
            payload: data
        })
        dispatch(getUser());
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload: error
        }) 
    }
}

export const RegisterUser = (formData) => async(dispatch)=> {
    try {
        dispatch({
            type:REGISTER_REQUEST
        })

        const {data} = await axios.post('/Account/register', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        dispatch({
            type:REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload: error
        }) 
    }
}

export const OrdersByUser = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:USERS_ORDER_REQUEST
        })
        
        const {data} = await axios.get(`/Order/user/${id}`);
        
        dispatch({
            type:USERS_ORDER_SUCCESS,
            payload: data.$values
        })
    } catch (error) {
        dispatch({
            type:USERS_ORDER_FAIL,
            payload: error
        }) 
    }
}

export const getUserById = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:USERS_BY_ID_REQUEST
        })
        const {data} = await axios.get(`/User/${id}`);
        
        dispatch({
            type:USERS_BY_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:USERS_BY_ID_FAIL,
            payload: error
        }) 
    }
}

