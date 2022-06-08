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

router.post('/', withAuth, async (req, res) => {
  try {
    const data = await Comment.create({ body: req.body.body, post_id: req.body.post_id, user_id: req.session.user_id });
    if (req.session) {
      res.status(200).json(data);
    } res.status(400).json({ message: 'no session' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
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