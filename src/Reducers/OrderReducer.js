import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, ORDER_BY_ID_FAIL, ORDER_BY_ID_REQUEST, ORDER_BY_ID_SUCCESS } from "../Constants/OrderConstants";

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

export const AllOrderReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ALL_ORDER_REQUEST:
            return {
                loading:true,
                orders:[]
            };
        case ALL_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload,
            };
        case ALL_ORDER_FAIL:
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

export const CreateOrderReducer = (state = {order:{}}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading:true,
                order:{}
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            };
        case CREATE_ORDER_FAIL:
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

export const DeleteOrderReducer = (state = {order:{}}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return {
                loading:true,
                order:[]
            };
        case DELETE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            };
        case DELETE_ORDER_FAIL:
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

