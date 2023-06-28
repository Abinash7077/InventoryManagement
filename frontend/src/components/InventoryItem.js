// src/components/InventoryItem.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import InventAdd from "./InventAdd";
import InventoryConsumption from "./InventoryConsumption";
import "../App.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const API_URL = "http://localhost:3000/api/inventory/items";

const InventoryItem = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post(API_URL, { name, unit });
      fetchItems();
      setName("");
      setUnit("");
      alert("Item Created")
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <>
      <div className="container-fluid main">
        <h1 className="text-center">Inventory Management System</h1>
      </div>
      <div className="container-fluid mt-4">
        <div className="container-fluid">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3} className="tabLeft">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link className="link" eventKey="first">Add Item</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="link" eventKey="second">Inventory Additions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="link" eventKey="third">Inventory Consumptions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="link" eventKey="fourth">Item List</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="">
                      <h2 className="text-center">Add Item Name / Unit</h2>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="unit" className="form-label">
                          Unit:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="unit"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-dark"
                        onClick={handleCreateItem}
                      >
                        Create Item
                      </button>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {" "}
                    <InventAdd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <InventoryConsumption />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                  <div className="container-fluid ">
          <h2 className="text-center">Item Lists</h2>
          <table className="table table-bordered mt-4">
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
       
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>

       
      </div>
    </>
  );
};

export default InventoryItem;
