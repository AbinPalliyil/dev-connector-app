import axios from 'axios';
import configUrl from '../utils/config';
import {
	GET_POST,
	POST_ERROR,
	UPDATE_LIKE,
	DELETE_POST,
	ADD_POST,
	GET_SINGLE_POST,
	ADD_COMMENT,
	DELETE_COMMENT
} from './type';
import { setAlert } from './alert';

// Get all posts
export const getPost = () => async (dispatch) => {
	try {
		const res = await axios.get(`${configUrl.url}/api/posts`);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Add Like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`${configUrl.url}/api/posts/like/${id}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Remove Like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`${configUrl.url}/api/posts/unlike/${id}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Delete post
export const removePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`${configUrl.url}/api/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: id,
		});
		dispatch(setAlert('Post Removed Successfull', 'Success'));
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Add post
export const addPost = (post) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};

	const body = JSON.stringify(post);
	try {
		const res = await axios.post(
			`${configUrl.url}/api/posts`,
			body,
			config,
		);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert('Post Added Successfull', 'success'));
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

		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Get single post
export const getSinglePost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${configUrl.url}/api/posts/${id}`);
		dispatch({
			type: GET_SINGLE_POST,
			payload: res.data,
		});
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const body = JSON.stringify(formData);

		const res = await axios.post(
			`${configUrl.url}/api/posts/comment/${postId}`,
			body,
			config,
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Comment Added successfully', 'sucess'));
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

		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};

//Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(
			`${configUrl.url}/api/posts/comment/${postId}/${commentId}`,
		);
		dispatch(setAlert('Comment Deleted successfully', 'success'));
		dispatch({
			type: DELETE_COMMENT,
			payload: commentId
		})
	} catch (err) {
		if (err && err.response) {
			return dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
		dispatch(setAlert('Please try again', 'danger'));
	}
};
