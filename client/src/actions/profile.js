import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, SET_ALERT } from './type';
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
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
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

		const res = await axios.post(`${configUrl.url}/api/profile`, body, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		dispatch(setAlert(edit ? "Profile updated" : "Profile Created"))
		history.push('/dashboard');
	} catch (err) {
		const errors =
		err && err.response && err.response.data && err.response.data.errors;
		if (errors) {
		 return	errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		if(err && err.response && err.response.statusText) {
		return	dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			})
		}

		dispatch(setAlert('Please try again', 'danger'));

	
		}
	};
