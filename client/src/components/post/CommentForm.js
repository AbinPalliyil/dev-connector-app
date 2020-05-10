import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({addComment, postId}) => {
    const [formData, setformData] = useState('');
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>leave a comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId,formData);
					setformData({ text: '' });
				}}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					value={formData.text}
					onChange={(e) => setformData({ text: e.target.value })}
					placeholder='Create a post'
					required></textarea>
				<input
					type='submit'
					className='btn btn-dark my-1'
					value='Submit'
				/>
			</form>
		</div>
	);
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
};

export default connect(null,{addComment}) (CommentForm);
