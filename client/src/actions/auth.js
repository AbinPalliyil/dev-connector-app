import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, SET_ALERT } from "../actions/type";
import {setAlert} from './alert'


export const register = (user) => async dispatch => {

    const config ={
      headers: {  "Content-Type": "application/json"}
        }
    const body = JSON.stringify(user);
    
    try {

        const res  = await axios.post('http://localhost:5000/api/users',body,config);
        dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            }
        )
        
    } catch (error) {
        const errors  = error && error.response.data&& error.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            dispatch(setAlert("Please try again", 'danger'))
        }
        dispatch({
            type: REGISTER_FAIL,
        }
    )
    
    }

}
