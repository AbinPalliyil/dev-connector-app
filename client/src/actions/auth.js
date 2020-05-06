import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCEESS,
	LOGIN_FAILED,
	LOGOUT,
} from '../actions/type';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import configUrl from '../utils/config';

//Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	

	try {
		const res = await axios.get(`${configUrl.url}/api/auth`);
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
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
			`${configUrl.url}/api/users`,
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

// Login user
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post(
			`${configUrl.url}/api/auth`,
			body,
			config,
		);
		dispatch({
			type: LOGIN_SUCEESS,
			payload: res.data,
		});
	} catch (error) {
		const errors =
			error && error.response.data && error.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert('Invalid credentials', 'danger'));
		}
		dispatch({
			type: LOGIN_FAILED,
		});
	}
};

// Lgout /clear
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
}