// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryItemRoutes = require('./routes/inventoryItemRoutes');
const inventoryAdditionRoutes = require('./routes/inventoryAdditionRoutes');
const inventoryConsumptionRoutes = require('./routes/inventoryConsumptionRoutes');
const InventoryItem = require('./models/inventoryItem');
const InventoryAddition = require('./models/inventoryAddition');
const InventoryConsumption = require('./models/inventoryConsumption');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/inventory', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Triggers and calculations
const updateInventoryItemStock = async (itemId) => {
  const additions = await InventoryAddition.aggregate([
    { $match: { itemId: mongoose.Types.ObjectId(itemId) } },
    { $group: { _id: null, total: { $sum: '$quantity' } } },
  ]);

  const consumptions = await InventoryConsumption.aggregate([
    { $match: { itemId: mongoose.Types.ObjectId(itemId) } },
    { $group: { _id: null, total: { $sum: '$quantity' } } },
  ]);

  const totalAdditions = additions.length > 0 ? additions[0].total : 0;
  const totalConsumptions = consumptions.length > 0 ? consumptions[0].total : 0;

  const item = await InventoryItem.findById(itemId);

  item.currentStock = totalAdditions - totalConsumptions;

  await item.save();
};









// Watch for changes in InventoryAddition and InventoryConsumption models
const startChangeStreams = () => {
  const additionChangeStream = InventoryAddition.watch();
  additionChangeStream.on('change', (change) => {
    const itemId = change.fullDocument.itemId;
    updateInventoryItemStock(itemId);
  });

  const consumptionChangeStream = InventoryConsumption.watch();
  consumptionChangeStream.on('change', (change) => {
    const itemId = change.fullDocument.itemId;
    updateInventoryItemStock(itemId);
  });
};

startChangeStreams();

// Routes
app.use('/api/inventory/items', inventoryItemRoutes);
app.use('/api/inventory/additions', inventoryAdditionRoutes);
app.use('/api/inventory/consumptions', inventoryConsumptionRoutes);

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
