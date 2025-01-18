import React from 'react';
import { Link } from 'react-router-dom';

const UserDonations = ({ profile }) => (
  <div>
    {profile.donations && profile.donations.length > 0 ? (
        <table className='table table-striped' style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
            <th style={{ padding: '10px', marginRight: '20px' }}>Date</th>
            <th style={{ padding: '10px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {profile.donations.map((donation, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', marginRight: '20px' }}>{new Date(donation.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '10px' }}>${donation.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No donations yet.</p>
      )}
        <div className='d-flex flex-column align-items-center mt-5'>
            <Link to="/authenticated/donation" className="btn btn-primary btn-small mb-2">Make Donations</Link>
        </div>
  </div>
);

export default UserDonations;