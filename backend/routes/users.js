const router = require('express').Router();

const
  {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    updateAvatar,
  } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
