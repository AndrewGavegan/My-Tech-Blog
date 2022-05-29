// use template of week 14 mini project //

const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commonRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;