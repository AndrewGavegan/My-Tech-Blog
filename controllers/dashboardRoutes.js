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
            order: [['id', 'ASC']],
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

router.get('/new', withAuth, async (req, res) => {
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
            order: [['id', 'ASC']],
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

router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                'body'
            ],
            order: [['id', 'ASC']],
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
        const posts = postData.get({ plain: true });
        res.render('update', {
            posts,
            userId: req.session.user_id,
            userName: req.session.name,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;