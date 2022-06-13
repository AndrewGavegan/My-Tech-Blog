const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// using redirect to make sure people who arent currently logged in get sent to signup or login pages //
// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   } res.render('login');
// });
// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   } res.render('signup');
// });

// getting all posts with comments and user data on who made the post and comment //
router.get('/', async (req, res) => {
  console.log(req.session);
  try {
    const postData = await Post.findAll({
      include: [{
        model: User
      }],
      group: ['id']
    });

    const posts = postData.map(post => post.get({ plain: true }));

    const commentData = await Comment.findAll({
      attributes: ['body']
    });

    const comments = commentData.map(post => post.get({ plain: true }));


    res.render('homepage', {
      posts,
      comments,
      userId: req.session.user_id,
      userName: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// getting one post from post id //
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      }, { model: User, attributes: ['username'] }]
    });
    const post = postData.get({ plain: true });
    console.log(post);
    if (!post) {
      res.status(404).json({ message: 'No post has this id' });
      return;
    } else {

      res.render('onepost', {
        post,
        userId: req.session.user_id,
        userName: req.session.name,
        loggedIn: req.session.loggedIn
      })
    };
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;