const router = require('express').Router();

const
  {
    getUserById,
    getUsers,
    login,
    updateUser,
    getCurrentUser,
    updateAvatar,
  } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.get('/me', getCurrentUser);

router.post('/signin', login);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
