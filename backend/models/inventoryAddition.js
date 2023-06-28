const mongoose = require('mongoose');

const inventoryAdditionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InventoryAddition', inventoryAdditionSchema);