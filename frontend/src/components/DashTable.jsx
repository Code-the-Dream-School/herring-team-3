import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth/AuthContext';

// Passed in api endpoint, headers for tables, and the event handler for showing the Edit Modal from Admin Dashboard component
const DashTable = ({ apiEndpoint, headers, handleShow }) => {
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the passed in api endpoint to fetch the appropriate data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt'); 
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData); 
      } catch (err) {
        setError(err.message); 
        console.error("Error fetching data:", err);
        alert("A network error occurred.")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, headers]);

  // If loading, display loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error, display error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // Show the correct table for the chosen data and handle if the edit button is clicked by showing the correct modal
    <div >
      {data.length > 0 ? (
        <table className='table-striped table-info table-bordered table-hover table-responsive'>
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header.key} className='px-3 py-3'>{header.label}</th>
              ))}
              <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={{ verticalAlign: 'top' }}>
                {headers.map(header => (
                  <td key={header.key} className='px-3 py-3'>{item[header.key]}</td>
                  
                ))}
                <td>
              <button 
                className="btn btn-outline mt-3 ms-1" 
                onClick={() => handleShow(item)}
              >
                <i className="fa-regular fa-eye"></i>

              </button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DashTable;
