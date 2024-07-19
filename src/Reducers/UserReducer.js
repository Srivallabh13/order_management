import { ALL_ORDER_FAIL } from "../Constants/OrderConstants";
import { USER_REQUEST, USER_SUCCESS, USER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, CLEAR_ERRORS, USERS_ORDER_REQUEST, USERS_ORDER_SUCCESS, USERS_ORDER_FAIL, USERS_BY_ID_FAIL, USERS_BY_ID_SUCCESS, USERS_BY_ID_REQUEST, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_ROLE_FAIL, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_REQUEST } from "../Constants/UserConstants";

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
export const DeleteUserReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                loading:true,
                user:{}
            };
        case DELETE_USER_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case DELETE_USER_FAIL:
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

export const UpdateUserReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                loading:true,
                user:{}
            };
        case UPDATE_USER_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case UPDATE_USER_FAIL:
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

export const updatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PASSWORD_REQUEST:
        return {
             loading: true 
        };
      case UPDATE_PASSWORD_SUCCESS:
        return {
            loading: false,
            success: true,
            message: action.payload 
        };
      case UPDATE_PASSWORD_FAIL:
        return {
            loading: false,
            error: action.payload
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
export const AllUsersReducer = (state = {users:[]}, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                loading:true,
                users:[]
            };
        case ALL_USERS_SUCCESS:
            return {
                loading:false,
                users:action.payload,
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

export const UpdateRoleReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case UPDATE_ROLE_REQUEST:
            return {
                loading:true,
                user:null
            };
        case UPDATE_ROLE_SUCCESS:
            return {
                loading:false,
                user:action.payload,
            };
        case UPDATE_ROLE_FAIL:
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
