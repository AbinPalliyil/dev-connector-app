import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike, removePost } from '../../actions/post';
import Post from '../post/Post';

const PostItem = ({
	addLike,
	removeLike,
	removePost,
	showActions,
	auth,
	post: { user, name, _id, avatar, text, date, likes, comments },
}) => {
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<a href='profile.html'>
					<img
						className='round-img'
						src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
						alt=''
					/>
					<h4>{name}</h4>
				</a>
			</div>
			<div>
				<p className='my-1'>{text}</p>
				<p className='post-date'>
					Posted on {<Moment format='YYYY/MM/DD'>{date}</Moment>}
				</p>
				{showActions && (
					<Fragment>
						<button
							type='button'
							onClick={(e) => addLike(_id)}
							className='btn btn-light'>
							<i className='fas fa-thumbs-up'></i>{' '}
							<span>{likes.length > 0 && likes.length}</span>
						</button>
						<button
							type='button'
							onClick={(e) => removeLike(_id)}
							className='btn btn-light'>
							<i className='fas fa-thumbs-down'></i>
						</button>
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Discussion{' '}
							{comments.length > 0 && (
								<span className='comment-count'>
									{comments.length}
								</span>
							)}
						</Link>
						{!auth.loading && user === auth.user._id && (
							<button
								type='button'
								onClick={(e) => removePost(_id)}
								className='btn btn-danger'>
								<i className='fas fa-times'></i>
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	removePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
};

const mapStatToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStatToProps, { addLike, removeLike, removePost })(
	PostItem,
);
