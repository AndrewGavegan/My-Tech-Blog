const router = require('express').Router();
const { Comment } = require('../../models');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const data = await Comment.findAll({ attributes: ['id', 'name', 'body'] })
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;