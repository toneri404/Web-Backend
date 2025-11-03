const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  items: { type: [cartItemSchema], default: [] },
  total: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

// helper to recompute total based on items and product prices
cartSchema.methods.recomputeTotal = async function () {
  await this.populate('items.productId');
  this.total = this.items.reduce((sum, it) => {
    const price = it.productId?.price || 0;
    return sum + price * it.quantity;
  }, 0);
  return this.total;
};

module.exports = mongoose.model('Cart', cartSchema);
