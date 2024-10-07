import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

const NewKit = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [grade_level, setGradeLevel] = useState('');
  const [messages, setMessages] = useState('');
  const navigate = useNavigate();
  const kitUrl = `${API_URL}/kits`

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
        
        const response = await fetch(kitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        });
    
        if (response.ok) {
          
          console.log("New Kit added successfully!");
          alert("New Kit added successfully!");
    
          // Clear input fields
          setName("");
          setDescription("");
          setGradeLevel("");
          setImage(null);
              
          navigate("/admin");
        } else {
          
          const errorData = await response.json();
          setMessages(
            errorData.status.errors.join(", ") || "Kit creation failed"
          );
        }
      } catch (error) {
        
        setMessages("An error occurred: " + error.message);
        console.log(error.message);
      }
    };

  return (
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
          placeholder='YYYY-YYYY'
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input 
          type="file" 
          className="form-control" 
          value={image} 
          onChange={(e) => setImage( e.target.value )}
          

        />
      </div>
      
      <button type="submit" className="btn btn-primary me-5">Add Kit</button>
      <button className='btn btn-danger'><Link to={"/admin"} style={{ textDecoration: 'none' }}>Cancel</Link></button>
      <div>{messages}</div>
    </form>
  );
};

export default NewKit;