const router = require('express').Router();
const ctrl = require('../controllers/user.controller');

router.post('/', ctrl.createUser);
router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
