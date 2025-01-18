import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';
import { AuthContext } from './auth/AuthContext';

// Component for creating a new kit
const NewKit = () => {
  const { logout } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grade_level, setGradeLevel] = useState('');
  const [messages, setMessages] = useState('');
  const navigate = useNavigate();
  const kitUrl = `${API_URL}/kits`
  const jwt = localStorage.getItem('jwt')

  // Handles adding an image to the kit
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
       
    const formData = new FormData(); 

    // Append the kit item data to the formData
    formData.append('kit[name]', name);
    formData.append('kit[description]', description);
    formData.append('kit[grade_level]', grade_level);
    

    // Append the image file to the formData if there is one
    if (image) {
      formData.append('kit[image]', image);
    }
    
      try {
        // Fetch kits and add new kit to backend
        const response = await fetch(kitUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwt}`,
          },
          body: formData,
        });
    
        if (response.ok) {
          
          console.log("New Kit added successfully!");
          alert("New Kit added successfully!");
          // Redirect to admin page
          navigate("/authenticated/admin");
        } else {
          
          const errorData = await response.json();
          setMessages(
            errorData.status.errors.join(", ") || "Kit creation failed"
          );
        }
      } catch (error) {
        
        setMessages("An error occurred: " + error.message);
        logout();
        console.log(error.message);
      }
    };

  return (
    // Display form for creating new kit
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={name} 
          onChange={(e) => setName( e.target.value )} 
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={(e) => setDescription( e.target.value )}
          required 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Grade Level</label>
        <input 
          type="text" 
          className="form-control" 
          value={grade_level} 
          onChange={(e) => setGradeLevel( e.target.value )}
          placeholder='PK-2, 3-5, 6-8, 9-12'
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input 
          type="file" 
          className="form-control"
          onChange={handleImageChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary me-5">Add Kit</button>
      <button className='btn btn-danger'><Link to={"/admin"} style={{ textDecoration: 'none' }}>Cancel</Link></button>
      <div>{messages}</div>
    </form>
  );
};

export default NewKit;