import axios from "axios";
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, ORDER_BY_ID_FAIL, ORDER_BY_ID_REQUEST, ORDER_BY_ID_SUCCESS, UPDATE_STATUS_FAIL, UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS } from "../Constants/OrderConstants";

export const OrderById = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:ORDER_BY_ID_REQUEST
        })

        const {data} = await axios.get(`/Order/${id}`);
        dispatch({
            type:ORDER_BY_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ORDER_BY_ID_FAIL,
            payload: error
        }) 
    }
}
export const DeleteOrder = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:DELETE_ORDER_REQUEST
        })
        const {data} = await axios.delete(`/Order/delete/${id}`);
        console.log(id,data);
        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload: error
        }) 
    }
}

export const UpdateOrderStatus = (id, status) => async(dispatch)=> {
    try {
        dispatch({
            type:UPDATE_STATUS_REQUEST
        })

        const {data} = await axios.put(`/Order/update/${id}/?status=${status}`);
        
        dispatch({
            type:UPDATE_STATUS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_STATUS_FAIL,
            payload: error
        }) 
    }
}

export const AllOrder = () => async(dispatch)=> {
    try {
        dispatch({
            type:ALL_ORDER_REQUEST
        })

        const {data} = await axios.get(`/Order`);
        dispatch({
            type:ALL_ORDER_SUCCESS,
            payload: data.$values
        })
    } catch (error) {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload: error
        }) 
    }
}

export const CreateOrder = (formData) => async(dispatch)=> {
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST
        })
        

        const {data} = await axios.post(`/Order/create`,formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload: error
        }) 
    }
}
