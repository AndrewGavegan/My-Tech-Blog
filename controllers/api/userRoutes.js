const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// linking to authentifictaion middleware that was set up in utils folder //
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: ['id', 'name', 'body']
        },
        {
          model: Comment,
          attributes: ['id', 'body'],
          include: {
            model: Post,
            attributes: ['name']
          }
        }]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard route dashboard //
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post
        }]
    });
    const user = userData.get({ plain: true });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: 'No user has this ID' });
      return;
    }
    res.render('dashboard', {
      user,
      userId: req.session.user_id,
      userName: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await User.create({ username: req.body.username, email: req.body.email, password: req.body.password });
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = await User.findOne({ where: { email: req.body.email } });

    if (!data) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json({ user: data, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const data = await User.update(req.body, {
      individualHooks: true, where: { id: req.params.id }
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No user has this ID' });
      return;
    } res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });
    if (!data) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;