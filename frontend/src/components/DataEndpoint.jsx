import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Passed in the various api endpoints for the tables
const DataEndpoint = ({ userUrl, kitsUrl, kitItemsUrl,  donationUrl, contactsUrl, ordersUrl, setSelectedEndpoint }) => {  

  
  return (
    // Displays the menu links for each table, sets the api endpoint based on menu selection
    <>
    <div className="offcanvas-body p-0">
          <nav className="navbar-dark">
            <ul className="navbar-nav">
              <li className="mb-2">
                <Link to="#table" className="nav-link px-3 active" onClick={() => setSelectedEndpoint(userUrl)}>
                  <span className="me-2">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>Users</span>
                </Link>
              </li>
              <li className="mb-2">
              <Link  to='/authenticated/new_forms/add_user' className="nav-link px-5">
              <span className="me-2"><i className="fas fa-user-plus"></i></span>
              <span>Add New User</span>  
              </Link>
            </li>
              <li className="mb-2">
                <Link to="#table"  className="nav-link px-3" onClick={() => setSelectedEndpoint(kitsUrl)}>
                  <span className="me-2">
                    <i className="bi bi-boxes"></i>
                  </span>
                  <span>Kits</span>
                </Link>
              </li>
              <li className="mb-2">
              <Link to='/authenticated/new_forms/add_kit' className="nav-link px-5">
                    <span className="me-2"><i className="bi bi-box"></i></span>
                    <span>Add New Kit</span>
                </Link>
            </li>
              <li className="mb-2">
                <Link to="#table"  className="nav-link px-3" onClick={() => setSelectedEndpoint(kitItemsUrl)}>
                  <span className="me-2">
                    <i className="fa-solid fa-book"></i>
                  </span>
                  <span>Kit Items</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/authenticated/new_forms/add_kit_item" className="nav-link px-5">
                    <span className="me-2"><i className="fa-solid fa-book-medical"></i></span>
                    <span>Add New Kit Item</span>
                </Link>
            </li>
              <li className="mb-2">
                <Link to="/authenticated/new_forms/add_item_to_kit" className="nav-link px-5">
                    <span className="me-2"><i className="fa-solid fa-box-open"></i></span>
                    <span>Add Item to Kit</span>
                </Link>
            </li>
              <li className="mb-2">
                <Link to="#table"  className="nav-link px-3" onClick={() => setSelectedEndpoint(ordersUrl)}>
                  <span className="me-2">
                    <i className="bi bi-clipboard-check-fill"></i>
                  </span>
                  <span>Orders</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#table"  className="nav-link px-3" onClick={() => setSelectedEndpoint(donationUrl)}>
                  <span className="me-2">
                    <i className="bi bi-cash-coin"></i>
                  </span>
                  <span>Donations</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#table"  className="nav-link px-3" onClick={() => setSelectedEndpoint(contactsUrl)}>
                  <span className="me-2">
                    <i className="bi bi-chat-right-text-fill"></i>
                  </span>
                  <span>Contacts</span>
                </Link>
              </li>
            </ul>
          </nav>
  
      </div>
      </>
      
  );
};

export default DataEndpoint;
