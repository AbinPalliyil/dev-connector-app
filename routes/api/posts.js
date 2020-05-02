const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route POST api/post
//@desc create a post
//@access Privat

router.post(
	'/',
	auth,
	[check('text', 'Text is required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
        }
		const user = await User.findById({_id:req.user.id}).select(
			'-password',
        );
        console.log(user)
		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id,
		});
		try {
			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.log(err.message);
			return res.status(500).send('Server error');
		}
	},
);


//@route Get api/post
//@desc Fetch all posts
//@access Private
router.get('/', auth, async(req, res) => {
    try {
        const posts= await Post.find().sort({date:-1});
        res.json(posts);
        
    } catch (err) {
        return res.status(500).send("Server side error");
    }
})

//@route Get api/post/:post_id
//@desc Fetch  posts using post_id
//@access Private
router.get('/:post_id', auth, async(req, res) => {
    try {
        const post= await Post.findById({_id: req.params.post_id});
        if(!post){
            return res.status(400).json({msg: "No posts found"})
        }
        res.json(post);
        
    } catch (err) {
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg: "No posts found"})

        }
        return res.status(500).send("Server side error");
    }
})

//@route Delete /api/posts/:post_id
//@desc Delete post using post_id
//@accees Private
router.delete('/:post_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg: "No posts found"})
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Unauthorized user"});
        }
        await post.remove();
        res.json({msg: "Post removed succecfully"})
        
    } catch (error) {
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg: "No posts found"})

        }
        return res.status(500).send("Server side error");
    }
})


module.exports = router;
