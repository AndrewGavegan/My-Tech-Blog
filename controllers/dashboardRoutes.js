// const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   console.log(req.session);
//   try {
//     const data = await Post.findAll({
//       attributes: ['id', 'name', 'body'],
//       include: [{
//         model: Comment, attributes: ['id', 'body', 'post_id', 'user_id'],
//         include: { model: User, attributes: ['username'] }
//       },
//       { model: User, attributes: ['username'] }]
//     });
//     const postArray = data.map(post =>
//       post.get({ plain: true }));
//     res.render('dashboard', { postArray, loggedIn: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/update/:id', withAuth, async (req, res) => {
//   try {
//     const data = await Post.findOne({
//       where: { id: req.params.id },
//       attributes: ['id', 'name', 'body'],
//       include: [{
//         model: Comment, attributes: ['id', 'body', 'post_id', 'user_id'],
//         include: { model: User, attributes: ['username'] }
//       },
//       { model: User, attributes: ['username'] }]
//     });
//     if (!data) {
//       res.status(404).json({ message: 'No post has this id' });
//       return;
//     }
//     const post = data.get({ plain: true });
//     res.render('update', { post, loggedIn: true });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/new/:id', withAuth, async (req, res) => {
//   try {
//     const data = await Post.findAll({
//       where: { user_id: req.session.user_id },
//       attributes: ['id', 'name', 'body'],
//       include: [{
//         model: Comment, attributes: ['id', 'body', 'post_id', 'user_id'],
//         include: { model: User, attributes: ['username'] }
//       },
//       { model: User, attributes: ['username'] }]
//     });
//     const postArray = data.map(post =>
//       post.get({ plain: true }));
//     res.render('new', { postArray, loggedIn: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// module.exports = router;