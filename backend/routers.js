/* // inventoryItemRoutes.js
const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/inventoryItem');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newItem = new InventoryItem({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// inventoryAdditionRoutes.js
const express = require('express');
const router = express.Router();
const InventoryAddition = require('../models/inventoryAddition');
const InventoryItem = require('../models/inventoryItem');

// Add inventory addition
router.post('/', async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const addition = new InventoryAddition({ itemId, quantity });
    await addition.save();

    // Update current stock
    const item = await InventoryItem.findById(itemId);
    item.currentStock += quantity;
    await item.save();

    res.status(201).json(addition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// inventoryConsumptionRoutes.js
const express = require('express');
const router = express.Router();
const InventoryConsumption = require('../models/inventoryConsumption');
const InventoryItem = require('../models/inventoryItem');

// Add inventory consumption
router.post('/', async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const consumption = new InventoryConsumption({ itemId, quantity });
    await consumption.save();

    // Update current stock
    const item = await InventoryItem.findById(itemId);
    item.currentStock -= quantity;
    await item.save();

    res.status(201).json(consumption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
 */