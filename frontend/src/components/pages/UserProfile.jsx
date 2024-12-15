import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/users/profile`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [API_URL]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.name || 'No name provided'}</p>
      <p><strong>Email:</strong> {profile.email || 'No emailed provided'}</p>
      
      <h2>Donations</h2>
      {profile.donations.length > 0 ? (
        <ul>
          {profile.donations.map((donation, index) => (
            <li key={index}>
              <p><strong>Amount:</strong> ${donation.amount}</p>
              <p><strong>Date:</strong> {new Date(donation.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations yet.</p>
      )}

      <h2>Orders</h2>
      {profile.orders.length > 0 ? (
        <ul>
          {profile.orders.map((order, index) => (
            <li key={index}>
              <p><strong>Requested Kit:</strong> {order.requested_kit || 'Not specified'}</p>
              <p><strong>Address:</strong> {order.address || 'No address provided'}</p>
              <p><strong>School Year:</strong> {order.school_year || 'No school year specified'}</p>
              <p><strong>Phone:</strong> {order.phone || 'No phone number provided'}</p>
              <p><strong>Comments:</strong> {order.comments || 'No comments provided'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}

      <div>
        <button onClick={() => window.location.href = '/make-donation'}>Make Donation</button>
        <button onClick={() => window.location.href = '/order-kits'}>Order Kits</button>
        <button onClick={() => window.location.href = '/request-speakers'}>Request Speakers</button>
      </div>
    </div>
  );
};

export default UserProfile;