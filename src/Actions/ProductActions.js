import axios from "axios";
import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST,CLEAR_ERRORS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, CLEAR_CART_STATE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, INVENTORY_REQUEST, INVENTORY_SUCCESS, INVENTORY_FAIL, ISAVAILABLE_SUCCESS, ISAVAILABLE_FAIL, ISAVAILABLE_REQUEST, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, SEARCH_PRODUCT_FAIL} from '../Constants/ProductConstants'

export const getProducts = () => async(dispatch)=> {
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        const {data} = await axios.get('https://localhost:7076/api/Products');
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

export const updateProduct = (id, formData) => async(dispatch)=> {
    try {
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        })
        
        
        const {data} = await axios.put(`https://localhost:7076/update/${id}`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload: error
        }) 
    }
}
export const CheckInventory = (products) => async(dispatch)=> {
    try {
        dispatch({
            type:INVENTORY_REQUEST
        })
        
        
        const {data} = await axios.post(`https://localhost:7076/recordsale`, products, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        dispatch({
            type:INVENTORY_SUCCESS,
            payload: data
        })
        return data;

    } catch (error) {
        dispatch({
            type:INVENTORY_FAIL,
            payload: error
        }) 
    }
}

export const IsAvailable = (products) => async(dispatch)=> {
    try {
        dispatch({
            type:ISAVAILABLE_REQUEST
        })
        
        const {data} = await axios.post(`https://localhost:7076/checkavailability`, products, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type:ISAVAILABLE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ISAVAILABLE_FAIL,
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
        const {data} = await axios.get(`https://localhost:7076/api/Products/${id}`);
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

export const clearCart = () => async(dispatch)=> {
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

export const Search = (query) => async(dispatch)=> {
    try {
        dispatch({
            type:SEARCH_PRODUCT_REQUEST
        })
        if(query.length===0) {
            dispatch({
                type:SEARCH_PRODUCT_SUCCESS,
                payload: null
            })
            return null;
        }
        const {data} = await axios.get(`https://localhost:7076/search/${query}`);
        dispatch({
            type:SEARCH_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:SEARCH_PRODUCT_FAIL,
            payload: error
        }) 
    }
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

  export const CreateProduct = (formData) => async(dispatch)=> {
    try {
        dispatch({
            type:CREATE_PRODUCT_REQUEST
        })

        const {data} = await axios.post('https://localhost:7076/create', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        dispatch({
            type:CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:CREATE_PRODUCT_FAIL,
            payload: error
        }) 
    }
}
  export const DeleteProduct = (id) => async(dispatch)=> {
    try {
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        })

        const {data} = await axios.delete(`https://localhost:7076/delete/${id}`)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload: error
        }) 
    }
}