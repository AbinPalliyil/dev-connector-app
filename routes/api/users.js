const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

//@route Post api/user
//@desc Register user
//@access Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check(
			'password',
			'Please enter password with minimum 6 characters',
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const { name, email, password } = req.body;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			//Checking is user exist
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'user alredy exists' }] });
			}
			//Set gravatar
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'rm' });
            
            user = new User({name, email,password,avatar});

            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.send("User registered");
            
		} catch (err) {
			console.log(err.message);
			return res.send(500).send('Server error');
		}

		res.send('User route');
	},
);

module.exports = router;
