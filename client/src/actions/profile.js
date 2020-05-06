import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './type';
import configUrl from '../utils/config';
import setAuthToken from '../utils/setAuthToken';

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
