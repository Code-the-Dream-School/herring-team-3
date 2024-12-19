import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfile(data.data.attributes);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="black-strip"></div>
      <section className="page-section" id="register">
      <div>
        <h1>User Profile</h1>
        <p><strong>Name:</strong> {profile.name || 'No name provided'}</p>
        <p><strong>Email:</strong> {profile.email || 'No email provided'}</p>
        
        <h2>Donations</h2>
        {profile.donations && profile.donations.length > 0 ? (
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
        {profile.orders && profile.orders.length > 0 ? (
          <ul>
            {profile.orders.map((order, index) => (
              <li key={index}>
                <p><strong>Requested Kit:</strong> {order.ordered_kit || 'Not specified'}</p>
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

        <div className='mt-5'>
          <Link to="/donation" className="btn btn-primary btn-small me-2">Make Donations</Link>
          <Link to="/kits" className='btn btn-primary btn-small me-2'>Order Kits</Link>
          <Link to="/speaker" className='btn btn-primary btn-small'>Request Speakers</Link>
        </div>
      </div>
      </section>
    </>
  );
};

export default UserProfile;