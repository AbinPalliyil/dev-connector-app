import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './type';
import configUrl from '../utils/config';
import setAuthToken from '../utils/setAuthToken';
import { body } from 'express-validator';

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
