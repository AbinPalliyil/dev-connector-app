import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import AddPost from './AddPost';

const Posts = ({ getPost, post: { posts, loading } }) => {
	useEffect(() => {
		getPost();
	}, [getPost]);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Posts</h1>
					<p className='lead'>
						<i className='fas fa-user'></i> Welcome to the
						community!
					</p>
					<AddPost />

					<div className='posts'>
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Posts.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Posts);
