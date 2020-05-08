import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import { connect } from 'react-redux';

const AddPost = ({addPost}) => {
	const [formData, setformData] = useState({
		text: '',
	});
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={e => {
                e.preventDefault();
                addPost(formData);
                setformData({text: ''})
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

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(AddPost);
