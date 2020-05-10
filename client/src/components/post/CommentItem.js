import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {deleteComment} from '../../actions/post'

const CommentItem = ({ comment: { _id, name, text, date, user }, postId, deleteComment, auth }) => {
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
                {!auth.loading && auth.user._id === user && (
                    <button className="btn btn-danger" onClick={ (e) => deleteComment(postId, _id)} >
                    <i className="fas fa-times"></i>
                    </button>
                )}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {deleteComment}) (CommentItem);
