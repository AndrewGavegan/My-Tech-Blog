const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
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
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      name: req.body.name,
      body: req.body.content,
      user_id: req.session.user_id
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postUpdate = await Post.update({
      name: req.body.name,
      body: req.body.body
    },
      {
        where: {
          id: req.params.id
        }
      });
    if (!postUpdate) {
      res.status(404).json({ message: 'No post has this ID' });
      return;
    } res.json(postUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletePost) {
      res.status(404).json({ message: 'No post has this ID' });
      return;
    } res.json(deletePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;