import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const UserProfile = ({
	getProfileById,
	profile: { profile, loading },
	auth,
	match,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/developers' className='btn btn-light'>
						Back To Profiles
					</Link>
					{auth &&
						auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div class='profile-exp bg-white p-2'>
							<h2 class='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map(
										(experience, index) => (
											<ProfileExperience
												experience={experience}
												key={index}
											/>
										),
									)}
								</Fragment>
							) : (
								<h4> No experence added</h4>
							)}
						</div>

						<div class='profile-edu bg-white p-2'>
							<h2 class='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map(
										(education, index) => (
											<ProfileEducation
												education={education}
												key={index}
											/>
										),
									)}
								</Fragment>
							) : (
								<h4> No experence added</h4>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

UserProfile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(UserProfile);
