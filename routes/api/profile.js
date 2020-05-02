const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile
//@desc Get user profile details
//@access Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send('Server side error');
	}
});

//@route Post api/profile
//@desc Create or update
//@access Private
router.post(
	'/',
	auth,
	[
		check('status', 'Status is required').not().isEmpty(),
		check('skills', 'Skills is required').not().isEmpty(),
	],
	async (req, res) => {
		debugger;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			githubusername,
			experience,
			education,
			youtube,
			twitter,
			instagram,
			facebook,
			linkedin,
		} = req.body;

		const profileFields = {};
		(profileFields.user = req.user.id),
			(profileFields.company = company && company);
		profileFields.website = website && website;
		profileFields.location = location && location;
		profileFields.bio = bio && bio;
		profileFields.githubusername = githubusername && githubusername;
		profileFields.skills =
			skills && skills.split(',').map((skill) => skill.trim());
		profileFields.status = status && status;
		//  profileFields.skills = skills && skills.split(',').map(skill => skill.trim());
		profileFields.social = {};
		profileFields.social.youtube = youtube && youtube;
		profileFields.social.facebook = facebook && facebook;
		profileFields.social.linkedin = linkedin && linkedin;
		profileFields.social.instagram = instagram && linkedin;
		profileFields.social.twitter = twitter && twitter;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{
						user: req.user.id,
					},
					{ $set: profileFields },
					{ new: true },
				);
				return res.json(profile);
			}

			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (error) {
			return res.status(500).send('Server side error');
		}
	},
);

//@route Get api/profile
//@desc Get user profiles
//@access Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'name',
			'avatar',
		]);
		res.json(profiles);
	} catch (err) {}
});

//@route Get api/profile/user:userid
//@desc Get user profile by user id
//@access Public
router.get('/user/:userid', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.userid,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'No user find with this userid' });
		}
		res.json(profile);
	} catch (err) {}
});

//@route Delete api/profile/user:userid
//@desc Delete user, profile, posts by user id
//@access Private
router.delete('/', auth, async (req, res) => {
	try {
		// @todo - remove posts
		await Profile.findOneAndRemove({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User removed' });
	} catch (err) {}
});

//@route Put api/profile/experience
//@desc Update user experience in profile
//@access Private
router.put(
	'/experience',
	auth,
	[
		check('title', 'Title is required').not().isEmpty(),
		check('company', 'Company is required').not().isEmpty(),
		check('from', 'From date is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			title,
			from,
			to,
			location,
			current,
			description,
        } = req.body;
        
        const newExp = {
            company,
			title,
			from,
			to,
			location,
			current,
			description,
        }
		try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(newExp);
            await profile.save();
            return res.json(profile);
		} catch (err) {
            console.log(err.message)
        }
	},
);

//@route Delete /api/profile/experience/:exp_id
//@desc Delete experience using exp_id
//@acess Private
router('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profie = await Profile.findOne({user: req.user.id});
        const removeindex= profie.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
        
        profie.experience.splice(removeindex, 1);
        await profie.save();
        res.send(profie);

        
    } catch (err) {
        console.log(err.message)        
    }
})

module.exports = router;
