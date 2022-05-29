const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const data = await Post.findAll({
            attributes: [
                'id',
                'title',
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
        })
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'body'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        if (!data) {
            res.status(404).json({ message: 'No post has this ID' })
            return;
        } res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.update({
            name: req.body.name,
            body: req.body.body
        },
            {
                where: {
                    id: req.params.id
                }
            })
        if (!data) {
            res.status(404).json({ message: 'No post has this ID' })
            return;
        } res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!data) {
            res.status(404).json({ message: 'No post has this ID' })
            return;
        } res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;