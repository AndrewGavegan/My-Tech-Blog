// use template of week 14 mini project //
const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes')
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;