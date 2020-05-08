import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfile }) => {
	useEffect(() => {
		getAllProfile();
	}, [getAllProfile]);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'>
							Browse and connect with developers
						</i>
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem
									key={profile._id}
									profile={profile}
								/>
							))
						) : (
							<h4>No profiles found..</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getAllProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfile })(Profiles);
