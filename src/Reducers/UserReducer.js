import { USER_REQUEST, USER_SUCCESS, USER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, CLEAR_ERRORS, USERS_ORDER_REQUEST, USERS_ORDER_SUCCESS, USERS_ORDER_FAIL, USERS_BY_ID_FAIL, USERS_BY_ID_SUCCESS, USERS_BY_ID_REQUEST } from "../Constants/UserConstants";

export const UserReducer = (state = {user:null}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                loading:true,
                user:null
            };
        case USER_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case USER_FAIL:
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

export const LoginReducer = (state = {user:null}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading:true,
                user:null
            };
        case LOGIN_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case LOGIN_FAIL:
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

export const RegisterReducer = (state = {user:null}, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                loading:true,
                user:null
            };
        case REGISTER_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case REGISTER_FAIL:
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


export const UserOrdersReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case USERS_ORDER_REQUEST:
            return {
                loading:true,
                orders:null
            };
        case USERS_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload,
            };
        case USERS_ORDER_FAIL:
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


export const UserByIdReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case USERS_BY_ID_REQUEST:
            return {
                loading:true,
                user:null
            };
        case USERS_BY_ID_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case USERS_BY_ID_FAIL:
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
