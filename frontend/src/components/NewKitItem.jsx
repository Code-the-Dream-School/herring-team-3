import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';
import { AuthContext } from './auth/AuthContext';

const NewKitItem = () => {
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null);
 
  const [messages, setMessages] = useState('');
  const navigate = useNavigate();
  const kitItemUrl = `${API_URL}/kit_items_only`
  const jwt = localStorage.getItem('jwt');

  const handleSubmit = async (e) => {
    e.preventDefault();
       
    const formData = new FormData(); 

    // Append the kit item data to the formData
    formData.append('kit_item[name]', name);
    formData.append('kit_item[description]', description);
    

    // Append the image file to the formData if there is one
    if (image) {
      formData.append('kit_item[image]', image);
    }
      try {
        
        const response = await fetch(kitItemUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwt}`,
          },
          body: formData,
        });
    
        if (response.ok) {
          
          console.log("New Kit Item added successfully!");
          alert("New Kit Item added successfully!");
    
          // Clear input fields
          setName("");
          setDescription("");
          setImage(null);
              
          navigate("/authenticated/admin");
        } else {
          
          const errorData = await response.json();
          setMessages(
            errorData.status.errors.join(", ") || "Kit Item creation failed"
          );
        }
      } catch (error) {
        
        setMessages("An error occurred: " + error.message);
        console.log(error.message);
        logout();
      }
    };

  return (
    // Displays form for creating a new Kit Item and attached image
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={name} 
          onChange={(e) => setName( e.target.value )} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={(e) => setDescription( e.target.value )} 
        />
      </div>
      <div className="mb-3">
      <label className="form-label">Image</label>
      <input 
        type="file" 
        className="form-control" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      </div>

      
      
      <button type="submit" className="btn btn-primary me-5">Add Kit Item</button>
      <button className='btn btn-danger'><Link to={"/admin"} style={{ textDecoration: 'none' }}>Cancel</Link></button>
      <div>{messages}</div>
    </form>
  );
};

export default NewKitItem;