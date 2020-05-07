import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
} from '../actions/type';
const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false,
			};
		case GET_PROFILE:
			UPDATE_PROFILE: return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};

		default:
			return state;
	}
}
