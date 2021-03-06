import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAILED,
	LOGIN_SUCEESS,
	LOGOUT,
	ACCOUNT_DELETED
} from '../actions/type';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCEESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				token:payload.token,
				loading: false,
				isAuthenticated: true,
			};
		case REGISTER_FAIL:
		case LOGIN_FAILED:
		case AUTH_ERROR:
        case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};

		default:
			return state;
	}
}
