import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/type";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state=initialState, action) {
    const { type, payload} = action;
    switch (type)  {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                payload,
                loading: false,
                isAuthenticated: true
             };
        case REGISTER_FAIL: 
             localStorage.removeItem('token');
             return{
                 ...state,
                 token: null,
                 isAuthenticated: false,
                 loading: false
             }           
    
        default:
            return state;
    }
}