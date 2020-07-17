const express = require('express');
const router = express.Router();
const Post = require('../models/Post').model;


router.get('/', async(req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

router.post('/create', async(req, res) => {

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        ownerId: req.body.ownerId
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }

});

router.post('/delete', async(req, res) => {

    try {
        const removedPost = await Post.remove({ _id: req.body.id });
        res.status(200).json(removedPost);

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }

});

module.exports = router;