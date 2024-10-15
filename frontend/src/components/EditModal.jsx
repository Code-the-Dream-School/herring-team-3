import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_URL2, API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

const EditModal = ({ record, show, handleClose, handleDelete, recordType }) => {
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();
  

  // Set initial form data when the modal opens
  useEffect(() => {
    setFormData(record || {}); // Populate formData with the selected record
  }, [record]);

  // Handle form field changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log("Image added to record")
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    
    const updatedFormData = new FormData();
    let api;
   
    if (recordType === 'kit') {
        updatedFormData.append('kit[name]', formData.name);
        updatedFormData.append('kit[description]', formData.description);
        updatedFormData.append('kit[grade_level]', formData.grade_level);
        api = "kits";
    } else if (recordType === 'kitItem') {
        updatedFormData.append('kit_item[name]', formData.name);
        updatedFormData.append('kit_item[description]', formData.description); 
        api = "kit_items_only";
        console.log("Kit item triggered")       
    } else if (recordType === 'kitRequest') {
        updatedFormData.append('kit_request[phone]', formData.phone);
        updatedFormData.append('kit_request[school_year]', formData.school_year);
        updatedFormData.append('kit_request[kit_id]', formData.kit_id);
        updatedFormData.append('kit_request[school_name]', formData.school_name);
        updatedFormData.append('kit_request[school_address]', formData.school_address);
        updatedFormData.append('kit_request[comments]', formData.comments);
        updatedFormData.append('kit_request[user_id]', formData.user_id);
        api = "kit_requests";
    } else if (recordType === 'donation') {
        updatedFormData.append('donation[amount]', formData.amount);
        updatedFormData.append('donation[user_id]', formData.user_id);
        api = "donations";
    } else if (recordType === 'contact') {
        updatedFormData.append('contact[user_id]', formData.user_id);
        updatedFormData.append('contact[name]', formData.name);
        updatedFormData.append('contact[email]', formData.email);
        updatedFormData.append('contact[phone]', formData.phone);
        updatedFormData.append('contact[message]', formData.message);
        api = "contacts";       
    } else if (recordType === 'user') {
        updatedFormData.append('user[name]', formData.name);  
        updatedFormData.append('user[role]', formData.role);
        api = "users";
    }
    
    // Add the image if selected
if (selectedImage) {
  if (recordType === 'kit') {
    updatedFormData.append('kit[image]', selectedImage);
    console.log('kit image appended');
  } else if (recordType === 'kitItem') {
    updatedFormData.append('kit_item[image]', selectedImage);
    console.log('kit_item image appended');
  }
}

    
    const apiEndpoint = `${API_URL}/${api}/${formData.id}`;
    console.log(apiEndpoint);
    console.log(updatedFormData);
    // Call the reusable function
    const result = await handleApiUpdate(apiEndpoint, updatedFormData);
    
    if (result.success) {
        console.log(`${recordType} updated successfully!`);
        alert(`${recordType} updated successfully!`);
        handleClose(); // Close the modal after success
    }
    };

    // Utility function for making the API call
  const handleApiUpdate = async (apiEndpoint, updatedFormData) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${jwt}`, 
        },
        body: updatedFormData, 
      });
  
      if (response.ok) {
        const data = await response.json(); 
        console.log("Update successful:", data);
        return { success: true, data };
      } else {
        console.error('Error updating the record');
        return { success: false };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false };
    }
  };
  // Stretch Goal: Extend the functionality of the password reset
  const handlePasswordReset = async () => {
    
    try {
      const response = await fetch(`${API_URL2}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify({ user: { email: formData.email } }),
      });
  
      if (response.ok) {
        alert('Password reset email sent successfully.');
        navigate("/admin");
      } else {
        alert('Error sending password reset email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending password reset email.');
    }
  };
  
  
      

  const onDelete = () => {
    handleDelete(record.id); // Pass the record ID to the delete handler
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${recordType.charAt(0).toUpperCase() + recordType.slice(1)}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        {recordType === 'user' && (
            <>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Role</label>
                <input 
                  type="text" 
                  name='role'
                  className="form-control"
                  value={formData.role || ''} 
                  onChange={onChange}
                  placeholder='user or admin' 
                  
                />
              </div>
              
            </>
          )}
          {recordType === 'kit' && (
            <>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description || ''}
                  onChange={onChange}
                  rows={5}
                />
              </div>
              <div className="mb-3">
                <label>Grade Level</label>
                <input 
                  type="text"
                  name='grade_level' 
                  className="form-control" 
                  onChange={onChange} 
                  placeholder='YYYY-YYYY'
                />
              </div>
              <div className="mb-3">
                <label>Update Image</label>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={handleImageChange} 
                />
              </div>
            </>
          )}

          {recordType === 'kitItem' && (
            <>
              <div className="mb-3">
                <label>Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Item Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description || ''}
                  onChange={onChange}
                  rows={5}
                />
              </div>
              <div className="mb-3">
                <label>Update Item Image</label>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={handleImageChange} 
                />
              </div>
            </>
          )}
           {recordType === 'kitRequest' && (
            <>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={onChange}
                  placeholder='123-456-7890'
                />
              </div>
              <div className="mb-3">
                <label>School Year</label>
                <input
                  className="form-control"
                  name="school_year"
                  value={formData.school_year || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>School Name</label>
                <input
                  className="form-control"
                  name="school_name"
                  value={formData.school_name || ''}
                  onChange={onChange}
                  
                />
              </div>
              <div className="mb-3">
                <label>School Address</label>
                <input
                  className="form-control"
                  name="school_address"
                  value={formData.school_address || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Comments</label>
                <input
                  className="form-control"
                  name="comments"
                  value={formData.comments || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>User Id</label>
                <input
                  className="form-control"
                  name="user_id"
                  value={formData.user_id || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Kit Id</label>
                <input
                  className="form-control"
                  name="kit_id"
                  value={formData.kit_id || ''}
                  onChange={onChange}
                />
              </div>
            </>
          )}
          {recordType === 'donation' && (
            <>
              <div className="mb-3">
                <label>Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>User Id</label>
                <input
                  className="form-control"
                  name="user_id"
                  value={formData.user_id || ''}
                  onChange={onChange}
                />
              </div>
             
            </>
          )}
          {recordType === 'contact' && (
            <>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>User Id</label>
                <input
                  className="form-control"
                  name="user_id"
                  value={formData.user_id || ''}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input 
                  type="text" 
                  name='email'
                  className="form-control"
                  value={formData.email || ''} 
                  onChange={onChange} 
                  
                />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name='phone'
                  className="form-control" 
                  value={formData.phone || ''}
                  onChange={onChange}
                  placeholder='123-456-7890' 
                />
              </div>
              <div className="mb-3">
                <label>Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={formData.message || ''}
                  onChange={onChange}
                  rows={5}
                />
              </div>
            </>
          )}

        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        {recordType === 'user' && (
          <Button variant="success" onClick={handlePasswordReset}>
            Send Password Reset
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;

