import axios from "axios";
import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST,CLEAR_ERRORS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, CLEAR_CART_STATE} from '../Constants/ProductConstants'

export const getProducts = () => async(dispatch)=> {
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        const {data} = await axios.get('http://localhost:5103/api/Products');
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error
        }) 
    }
}

export const getProductDetails = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        // console.log(id);
        const {data} = await axios.get(`http://localhost:5103/api/Products/${id}`);
        // console.log(data)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error
        }) 
    }
}

export const clearErrors = () => async(dispatch)=> {
    dispatch({
        type:CLEAR_ERRORS
    })
}

export const clearState = () => async(dispatch)=> {
    dispatch({
        type:CLEAR_CART_STATE
    })
}

export const AddToCart = (product) => {
    
        return {
            type: ADD_TO_CART,
            payload: product
        };
}


export const RemoveFromCart = (id) => {
    console.log("Action "+ id)
    return {
        type: REMOVE_FROM_CART,
        payload: id
    };
};
export const UpdateCart = (productID, quantity) => {
    return {
      type: UPDATE_CART,
      payload: { productID, quantity }
    };
  };