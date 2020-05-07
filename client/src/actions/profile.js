import axios from 'axios';
import { setAlert } from './alert';
import {ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from './type';
import configUrl from '../utils/config';
import setAuthToken from '../utils/setAuthToken';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get(`${configUrl.url}/api/profile/me`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

// Crate/Edit profile
export const createProfile = (profile, history, edit = false) => async (
	dispatch,
) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const body = JSON.stringify(profile);

		const res = await axios.post(
			`${configUrl.url}/api/profile`,
			body,
			config,
		);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(
			setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'),
		);
		!edit && history.push('/dashboard');
	} catch (err) {
		const errors =
			err &&
			err.response &&
			err.response.data &&
			err.response.data.errors;
		if (errors) {
			return errors.forEach((error) =>
				dispatch(setAlert(error.msg, 'danger')),
			);
		}
		if (err && err.response && err.response.statusText) {
			return dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}

		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Add experience
export const addExperience = (experience, history) => async (dispatch) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const body = JSON.stringify(experience);
		const res = await axios.put(
			`${configUrl.url}/api/profile/experience`,
			body,
			config,
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experiences Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors =
			err &&
			err.response &&
			err.response.data &&
			err.response.data.errors;
		if (errors) {
			return errors.forEach((error) =>
				dispatch(setAlert(error.msg, 'danger')),
			);
		}
		if (err && err.response && err.response.statusText) {
			return dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Add Education
export const addEducation = (education, history) => async (dispatch) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const body = JSON.stringify(education);
		const res = await axios.put(
			`${configUrl.url}/api/profile/education`,
			body,
			config,
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education Added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors =
			err &&
			err.response &&
			err.response.data &&
			err.response.data.errors;
		if (errors) {
			return errors.forEach((error) =>
				dispatch(setAlert(error.msg, 'danger')),
			);
		}
		if (err && err.response && err.response.statusText) {
			return dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

// Delete experience
export const deleteExperience = id => async dispatch => {
	try {
	const res = await axios.delete(`${configUrl.url}/api/profile/experience/${id}`);
	dispatch({
		type: UPDATE_PROFILE,
		payload: res.data
	})

	dispatch(setAlert('Experience Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		})
	}
}

// Delete Education
export const deleteEducation = id => async dispatch => {
	try {
	const res = await axios.delete(`${configUrl.url}/api/profile/education/${id}`);
	dispatch({
		type: UPDATE_PROFILE,
		payload: res.data
	})

	dispatch(setAlert('Education Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		})
	}
}

// Delet account/profile
export const deleteAccount = ()  => async dispatch => {
	if(window.confirm('Are you sure want to delete account?')){
		
	try {
	const res = await axios.delete(`${configUrl.url}/api/profile`);
	dispatch({
		type: CLEAR_PROFILE,
	})

	dispatch({
		type: ACCOUNT_DELETED
	})

	dispatch(setAlert('Your Account Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		})
	}
}
}

