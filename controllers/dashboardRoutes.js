const router = router('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../utils/auth');

// mvc middleware method from week 14 activity 20 //
// Use the custom middleware before allowing the user to access the dashboard //
router.get('/', withAuth, async (req, res) => {
    console.log(req.session);
    try {
        const data = await Post.findAll({
            attributes: ['id', 'name', 'created_at', 'body'],
            include: [{
                model: Comment, attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }]
        });
        const postArray = data.map(post =>
            post.get({ plain: true }));
        res.render('dashboard', { postArray, loggedIn: true })
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    };
});

router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'created_at', 'body'],
            include: [{
                model: Comment, attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }]
        })
        if (!data) {
            res.status(404).json({ message: 'No post has this id' });
            return;
        }
        const post = data.get({ plain: true });
        res.render('update', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'name', 'created_at', 'body'],
            include: [{
                model: Comment, attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }]
        })
        const postArray = data.map(post =>
            post.get({ plain: true }));
        res.render('new', { postArray, loggedIn: true })
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    };
});

module.exports = router;