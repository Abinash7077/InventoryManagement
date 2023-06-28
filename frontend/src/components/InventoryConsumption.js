// src/components/InventoryConsumption.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/inventory/consumptions';

const InventoryConsumption = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/inventory/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleConsumption = async () => {
    try {
      const item = items.find((item) => item._id === selectedItem);
      let convertedQuantity = quantity;

      if (item.unit === 'g') {
        convertedQuantity = quantity / 1000; // Convert grams to kilograms
      }

      await axios.post(API_URL, { itemId: selectedItem, quantity: convertedQuantity });
      setSelectedItem('');
      setQuantity('');
    } catch (error) {
      console.error('Error consuming item:', error);
    }
  };

  return (
    <div className="container ">
      <h2 className='text-center'>Inventory Consumption</h2>
      <div className="mb-3">
        <label htmlFor="item" className="form-label">Item:</label>
        <select
          className="form-select"
          id="item"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} 
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity:</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleConsumption}>Consume Item</button>
    </div>
  );
};

export default InventoryConsumption;
