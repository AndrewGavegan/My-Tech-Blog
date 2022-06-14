const router = require('express').Router();
const { Comment } = require('../../models');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Comment.findAll({});
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      user_id: req.session.user_id,
      post_id: req.body.post_id,
      body: req.body.content
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Comment.destroy({ where: { id: req.params.id } });
    if (!data) {
      res.status(400).json({ message: 'Comment not found' });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;