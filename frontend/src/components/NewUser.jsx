import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL2 } from '../constants';

const NewUser = () => {
  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  // Add useState for firstName and lastName
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');   
  const [role, setRole] = useState('');  

  const registrationUrl = `${API_URL2}/signup`
  const [registrationMessages, setRegistrationMessages] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
       
      const updatedUserData = {
        user: {
          // Add firstName and lastName to data sent
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role,
        },
      };
    
      try {
        // Send POST request to registration endpoint
        const response = await fetch(registrationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });
    
        if (response.ok) {
          
          console.log("New User added successfully!");
          alert("New User added successfully!");
    
          // Clear input fields
          setEmail("");
          setPassword("");
          // Add firstName and lastName to cleared fields
          setFirstName("");
          setLastName("");
          setRole("");
    
          navigate("/admin");
        } else {
          
          const errorData = await response.json();
          setRegistrationMessages(
            errorData.status.errors.join(", ") || "Registration failed"
          );
        }
      } catch (error) {
        
        setRegistrationMessages("An error occurred: " + error.message);
        console.log(error.message);
      }
    };
  

  return (
    // Displays form for creating a new user, admin can set role as user or admin
    <form onSubmit={handleSubmit}>
      {/* Add first name and last name input fields */}
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      {/* It might make sense to add a radio button here for choosing the appropriate role? */}
      <div className="mb-3">
        <label className="form-label">Role</label>
        <input 
          type="text" 
          className="form-control" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary me-5">Add User</button>
      <button className='btn btn-danger'><Link to={"/admin"} style={{ textDecoration: 'none' }}>Cancel</Link></button>
      <div>{registrationMessages}</div>
    </form>
  );
};

export default NewUser;
