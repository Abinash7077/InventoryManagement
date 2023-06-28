// inventoryItem.js
const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentStock: { type: Number, default: 0 },
  unit: { type: Number, required: true }, // New field for unit of measurement
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);



