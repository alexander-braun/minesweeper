const express = require('express')
const router = express.Router()
const Post = require('../../models/posts')


// @route       POST api/posts
// @description Create a post
// @access      Public

router.post('/', async (req, res) => { 
    try{
        const newPost = new Post({
            user: req.body.user,
            lvl: req.body.lvl,
            time: req.body.time
        })
        const post = await newPost.save()

        res.json(post)
    } catch(error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})

// @route       GET api/posts
// @description Get all posts
// @access      Public

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch(error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})


module.exports = router