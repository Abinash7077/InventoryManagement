// src/components/InventoryItem.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventAdd from './InventAdd';
import InventoryConsumption from './InventoryConsumption';
import '../App.css'

const API_URL = 'http://localhost:3000/api/inventory/items';

const InventoryItem = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    fetchItems();
  },[]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post(API_URL, { name, unit });
      fetchItems();
      setName('');
      setUnit('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <>
    <div className="container-fluid main"><h1 className='text-center'>Inventory Management System</h1></div>
    <div className="container-fluid mt-4">
      <div className="container-fluid 
      ">
        <div className="row">
          <div className="col-4">
          <h2 className='text-center'>Inventory Item Management</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="unit" className="form-label">Unit:</label>
        <input
          type="text"
          className="form-control"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleCreateItem}>Create Item</button>
          </div>
          <div className="col-4">
            <InventAdd/>
           
          </div>
          <div className="col-4"> <InventoryConsumption/></div>
        </div>
      </div>
      






      {/* table start */}
      <div className="container">    <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Stock</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.currentStock}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  
    </>
  );
};

export default InventoryItem;
