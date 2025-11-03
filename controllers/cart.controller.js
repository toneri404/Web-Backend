const Cart = require('../models/cart.model');

exports.createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    await cart.recomputeTotal();
    await cart.save();
    res.json(await cart.populate('items.productId'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    // upsert so first update creates a cart
    let cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    await cart.recomputeTotal();
    await cart.save();
    cart = await cart.populate('items.productId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
