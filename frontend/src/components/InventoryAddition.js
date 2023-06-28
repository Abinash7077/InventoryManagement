/* // src/components/InventoryAddition.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/inventory/additions';

const InventoryAddition = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleAddition = async () => {
   
    try {
      const additionItems = selectedItems.map((item) => ({
        itemId: item._id,
        quantity,
      }));

      await axios.post(API_URL, { additions: additionItems });
      setSelectedItems([]);
      setQuantity('');
    } catch (error) {
      console.error('Error adding items:', error);
    }
  };

  const handleItemSelection = (itemId) => {
    setSelectedItems((prevItems) => {
      const item = items.find((item) => item._id === itemId);
      return [...prevItems, item];
    });
  };
  

  const handleItemDeselection = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <div className="container mt-4">
      <h2>Inventory Addition</h2>
      <div className="mb-3">
        <label htmlFor="items" className="form-label">Items:</label>
        <select
          className="form-select"
          id="items"
          multiple
          value={selectedItems.map((item) => item._id)}
          onChange={(e) => setSelectedItems(Array.from(e.target.selectedOptions, (option) => option.value))}
        >
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} ({item.currentStock} {item.unit})
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
      <button className="btn btn-primary" onClick={handleAddition}>Add Items</button>
      <div className="mt-4">
        <h4>Selected Items:</h4>
        <ul className="list-group">
          {selectedItems.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between">
              <span>{item.name} ({item.currentStock} {item.unit})</span>
              <button className="btn btn-danger" onClick={() => handleItemDeselection(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryAddition;




 */

// src/components/InventoryAddition.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/inventory/additions';

const InventoryAddition = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleAddition = async () => {
    try {
      const additionItems = selectedItems.map((item) => ({
        itemId: item._id,
        quantity,
      }));

      await axios.post(API_URL, { additions: additionItems });
      setSelectedItems([]);
      setQuantity('');
    } catch (error) {
      console.error('Error adding items:', error);
    }
  };

  const handleItemSelection = (itemId) => {
    const selectedItem = items.find((item) => item._id === itemId);
    setSelectedItems((prevItems) => [...prevItems, selectedItem]);
  };

  const handleItemDeselection = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <div className="container mt-4">
      <h2>Inventory Addition</h2>
      <div className="mb-3">
        <label htmlFor="items" className="form-label">Items:</label>
        <select
          className="form-select"
          id="items"
          multiple
          value={selectedItems.map((item) => item._id)}
          onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
            setSelectedItems(selectedIds.map((id) => items.find((item) => item._id === id)));
          }}
        >
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} ({item.currentStock} {item.unit})
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
      <button className="btn btn-primary" onClick={handleAddition}>Add Items</button>
      <div className="mt-4">
        <h4>Selected Items:</h4>
        <ul className="list-group">
          {selectedItems.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between">
              <span>{item.name} ({item.currentStock} {item.unit})</span>
              <button className="btn btn-danger" onClick={() => handleItemDeselection(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryAddition;
