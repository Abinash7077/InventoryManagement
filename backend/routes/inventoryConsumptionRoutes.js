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
module.exports=router;