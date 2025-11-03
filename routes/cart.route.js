const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.createCart);
router.get('/:userId', cartController.getCart);
router.put('/:userId', cartController.updateCart);
router.delete('/:userId', cartController.deleteCart);

module.exports = router;
