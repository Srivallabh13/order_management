import { ADD_IMAGE_FAIL, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS } from "../Constants/PhotoConstants";

export const AddPhotoReducer = (state = {photo:{}}, action) => {
    switch (action.type) {
        case ADD_IMAGE_REQUEST:
            return {
                loading:true,
                photo:null
            };
        case ADD_IMAGE_SUCCESS:
            return {
                loading:false,
                photo:action.payload,
            };
        case ADD_IMAGE_FAIL:
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