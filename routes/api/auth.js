const express = require('express');
const { check, validationResult } = require('express-validator');
const bcyrpt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route GET api/auth
//@desc Test route
//@access Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		4;
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Serever side error');
	}
});

//@route POST api/auth
//@desc Auhtenticate user and get token
//@access Public
router.post(
	'/',
	//validation checking
	[
		check('email', 'Invalid Email').isEmail(),
		check('password', 'password is required').not().isEmpty(),
	],
	async (req, res) => {
        debugger;
		//validation error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}
		// Fetch user details
		const { email, password } = req.body;
		try {
			let user = await User.find({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}
			// Compare password
			const isMatch = bcyrpt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}
			// Token Generate
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtToken'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				},
			);
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Serever side error');
		}
	},
);

module.exports = router;
