const express = require('express');
const router = express.Router();

console.log("user")
//@route GET api/user
//@desc Test route
//@access Public

router.get('/', (req,res) => {
    res.send("User route");
})

module.exports = router;