const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// using redirect to make sure people who arent currently logged in get sent to signup or login pages //
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } res.render('login');
});
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } res.render('signup');
});

// getting all posts with comments and user data on who made the post and comment //
router.get('/', async (req, res) => {
    console.log(req.session);
    try {
        const data = await Post.findAll({
            attributes: ['id', 'name', 'body'],
            include: [{
                model: Comment, attributes: ['id', 'body', 'post_id', 'user_id'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }]
        });
        const postArray = data.map(post =>
            post.get({ plain: true }));
        res.render('homepage', { postArray, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    };
});

// getting one post from post id //
router.get('/post/:id', async (req, res) => {
    try {
        const data = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'body'],
            include: [{
                model: Comment, attributes: ['id', 'body', 'post_id', 'user_id'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }]
        })
        if (!data) {
            res.status(404).json({ message: 'No post has this id' });
            return;
        }
        const post = data.get({ plain: true });
        res.render('onePost', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;