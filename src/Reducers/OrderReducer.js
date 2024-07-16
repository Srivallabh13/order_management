import { CLEAR_ERRORS, ORDER_BY_ID_FAIL, ORDER_BY_ID_REQUEST, ORDER_BY_ID_SUCCESS } from "../Constants/OrderConstants";

export const OrderByIdReducer = (state = {order:{}}, action) => {
    switch (action.type) {
        case ORDER_BY_ID_REQUEST:
            return {
                loading:true,
                order:null
            };
        case ORDER_BY_ID_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            };
        case ORDER_BY_ID_FAIL:
            return {
                loading:false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };
    
        default:
            return state;
    }
};

