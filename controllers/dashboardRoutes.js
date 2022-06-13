const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'name',
                'body'
            ],
            order: [['id', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            userId: req.session.user_id,
            userName: req.session.name,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'name',
                'body'
            ],
            order: [['id', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('new', {
            posts,
            userId: req.session.user_id,
            userName: req.session.name,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;