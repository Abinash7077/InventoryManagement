 const express = require('express');
const router = express.Router();
const InventoryAddition = require('../models/inventoryAddition');
const InventoryItem = require('../models/inventoryItem');


// Add inventory addition
router.post('/', async (req, res) => {
  const { itemId, quantity } = req.body;
  console.log(req.body)
  try {
    const addition = new InventoryAddition({ itemId, quantity });
    await addition.save();

    // Update current stock
    const item = await InventoryItem.findById(itemId);
    item.currentStock+=quantity;

    await item.save();
    console.log(addition)

    res.status(201).json(addition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports=router; 
