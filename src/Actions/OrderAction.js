import axios from "axios";
import { ORDER_BY_ID_FAIL, ORDER_BY_ID_REQUEST, ORDER_BY_ID_SUCCESS } from "../Constants/OrderConstants";

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
