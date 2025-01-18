import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

import React, { useState, useEffect } from 'react';

const AddItemToKit = () => {
  const [kitItems, setKitItems] = useState([]);
  const [kits, setKits] = useState([]);
  const [selectedKitItem, setSelectedKitItem] = useState('');
  const [selectedKit, setSelectedKit] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState('');
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate();

  // Fetches kit items and kits from the backend
  useEffect(() => {
    fetch(`${API_URL}/kit_items_only`)
      .then(response => response.json())
      .then(data => setKitItems(data));
    fetch(`${API_URL}/kits`)
      .then(response => response.json())
      .then(data => setKits(data));
  }, []);

  // Finds desired kit item and sets variable
  const handleKitItemChange = (e) => {
    const kitItemId = e.target.value;
    const kitItem = kitItems.find(item => item.id === parseInt(kitItemId));
    setSelectedKitItem(kitItemId);
    setName(kitItem.name);
    setDescription(kitItem.description);

  };

  // Sets desired kit
  const handleKitChange = (e) => {
    setSelectedKit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adds selected kit item to selected kit
    try {
      const response = await fetch(`${API_URL}/kits/${selectedKit}/kit_items/${selectedKitItem}/add_to_kit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
  
      if (response.ok) {
        console.log("Kit item successfully added to kit!");
        setMessages('Kit item successfully added to kit!');
        navigate('/authenticated/admin');
      } else {
        console.log("Adding to kit failed:", response.statusText);
        setMessages('Adding to kit failed.');
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages("An error occurred: " + error.message);
    }
  };
  
  return (
    // Displays form to select kit item and kit from drop down
    <form onSubmit={handleSubmit}>
      <div className="mb-3 dropdown-container">
        <label className="form-label">Kit Item</label>
        <select className="form-control" value={selectedKitItem} onChange={handleKitItemChange}>
          <option value="" disabled>Select a kit item to add</option>
          {kitItems.map(kitItem => (
            <option key={kitItem.id} value={kitItem.id}>
              {kitItem.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3 dropdown-container">
        <label className="form-label">Kit</label>
        <select className="form-control" value={selectedKit} onChange={handleKitChange}>
          <option value="" disabled>Select a kit</option>
          {kits.map(kit => (
            <option key={kit.id} value={kit.id}>
              {kit.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary me-5">Add Kit Item</button>
      <button type="button" className='btn btn-danger'><Link to="/admin" style={{ textDecoration: "none" }}>Cancel</Link></button>
      <div>{messages}</div>
    </form>
);
}
export default AddItemToKit;
