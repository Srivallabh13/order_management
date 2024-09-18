import axios from "axios";
import { ADD_IMAGE_FAIL, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS } from "../Constants/PhotoConstants";

export const AddPhoto = (image, dto=null) => async(dispatch)=> {
    try {
        dispatch({
            type:ADD_IMAGE_REQUEST
        })

        const formData = new FormData();
        formData.append('File', image);
        const {data} = await axios.post('/Photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `bearer ${dto.token}`
            }
          });
        dispatch({
            type:ADD_IMAGE_SUCCESS,
            payload: data
        })
        return data;
    } catch (error) {
        dispatch({
            type:ADD_IMAGE_FAIL,
            payload: error
        }) 
    }
}