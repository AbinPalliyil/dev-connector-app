import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
} from '../actions/type';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('http://localhost:5000/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register user
export const register = (user) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(user);

	try {
		const res = await axios.post(
			'http://localhost:5000/api/users',
			body,
			config,
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		const errors =
			error && error.response.data && error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert('Please try again', 'danger'));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
