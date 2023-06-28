// inventoryItemRoutes.js
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
  const { name,unit } = req.body;

  try {
    const newItem = new InventoryItem({ name,unit });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports=router;