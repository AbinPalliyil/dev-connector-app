import React, {useState, Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisable, toogleTodateDisable] = useState(false);

	const {
		school,
		degree,
		fieldofstudy,
		from,
		current,
		to,
		description,
	} = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Fragment>
			<h1 class='large text-primary'>Add Your Education</h1>
			<p class='lead'>
				<i class='fas fa-graduation-cap'></i> Add any school, bootcamp,
				etc that you have attended
			</p>
			<small>* = required field</small>
			<form class='form' onSubmit={(e) => onSubmit(e)}>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						value={school}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						value={degree}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							onChange={(e) => {
								setFormData({
									...formData,
									[e.target.name]: e.target.value,
								});
								toogleTodateDisable(!toDateDisable);
							}}
						/>{' '}
						Current School or Bootcamp
					</p>
				</div>
				<div class='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						disabled={toDateDisable}
						value={to}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						onChange={(e) => onChange(e)}
						value={description}
						placeholder='Program Description'></textarea>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<Link class='btn btn-light my-1' to='dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
