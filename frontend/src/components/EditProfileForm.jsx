import React, { useState } from 'react';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = ({ profile, jwt }) => {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    oldPassword: '',
    newPassword: '',
    bio: profile?.bio || '',
    profileImage: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    form.append('bio', formData.bio);
    if (formData.oldPassword && formData.newPassword) {
      form.append('oldPassword', formData.oldPassword);
      form.append('newPassword', formData.newPassword);
    }
    if (formData.profileImage) {
      form.append('profileImage', formData.profileImage);
    }

    try {
      const response = await fetch(`${API_URL}/users/${profile.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      alert('Profile updated successfully');
      navigate(`/users/${profile.id}/profile`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Old Password:
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Profile Image:
        <input type="file" name="profileImage" onChange={handleChange} />
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;