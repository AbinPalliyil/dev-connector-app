import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSinglePost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

const Post = ({ getSinglePost, post: { post, loading }, match }) => {
	useEffect(() => {
		getSinglePost(match.params.id);
	}, [getSinglePost, match.params.id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<PostItem post={post} showActions={false} />
		</Fragment>
	);
};

Post.propTypes = {
	getSinglePost: PropTypes.func.isRequired,
	post: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getSinglePost })(Post);
