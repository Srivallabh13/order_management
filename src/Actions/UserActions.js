import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, USERS_ORDER_REQUEST, USERS_ORDER_SUCCESS, USERS_ORDER_FAIL, USERS_BY_ID_REQUEST, USERS_BY_ID_SUCCESS, USERS_BY_ID_FAIL, ALL_USERS_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_REQUEST, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_ROLE_REQUEST, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAIL } from "../Constants/UserConstants";


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

export const UpdateUser = (id, formData) => async(dispatch)=> {
    try {
        dispatch({
            type:UPDATE_USER_REQUEST
        })
        console.log(formData);
        const {data} = await axios.put(`/User/update/${id}`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_USER_FAIL,
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
export const DeleteUser = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:DELETE_USER_REQUEST
        })
        
        const {data} = await axios.delete(`/User/delete/${id}`);
        
        dispatch({
            type:DELETE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:DELETE_USER_FAIL,
            payload: error
        }) 
    }
}

export const AllUsers = () => async(dispatch)=> {
    try {
        dispatch({
            type:ALL_USERS_REQUEST
        })
        
        const {data} = await axios.get(`/User`);
        
        dispatch({
            type:ALL_USERS_SUCCESS,
            payload: data.$values
        })
    } catch (error) {
        dispatch({
            type:ALL_USERS_FAIL,
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

export const UpdateRole = (id, role) => async(dispatch)=> {
    try {
        dispatch({
            type:UPDATE_ROLE_REQUEST
        })

        const {data} = await axios.put(`/User/update/role/${id}/?role=${role}`);
        
        dispatch({
            type:UPDATE_ROLE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ROLE_FAIL,
            payload: error
        }) 
    }
}

export const updatePassword = (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(formData);
      const { data } = await axios.put(`/User/${id}/password`, formData, config);
  
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error?.response && error?.response?.data?.message ? error?.response?.data?.message : error?.message,
      });
    }
  };
  
  