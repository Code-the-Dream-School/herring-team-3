import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import PageWrapper from './components/PageWrapper';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Kits from './components/pages/Kits';
import RequestKit from './components/pages/RequestKit'
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import ScrollToHash from './components/ScrollToHash';
import { useState, useEffect } from 'react';
import Confirmation from './components/pages/Confirmation';
import Donation from './components/pages/Donation';
import RequestSpeaker from './components/pages/RequestSpeaker';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './components/pages/AdminDashboard';
import NewForms from './components/NewForms';
import NewKit from './components/NewKit';
import NewUser from './components/NewUser';
import AddNew from './components/pages/AddNew';
import NewKitItem from './components/NewKitItem';
import AddItemToKit from './components/AddItemToKit';
import UserProfile from './components/pages/UserProfile';
import EditProfileForm from './components/EditProfileForm';




function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

    // Method handles login state and token, checking for existence or expiration
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // Current time in seconds

        if (decoded.exp > now) {
          setLoggedIn(true); // Token is valid
          setUser(decoded.user ? decoded.user : null); // Set user data

          // Calculate remaining time until token expiration
          const timeUntilExpiration = (decoded.exp - now) * 1000;

          // Notify 5 minutes before expiration
          if (timeUntilExpiration < 300000) {
            alert("Your session is about to expire. Please save your work.");
          }

          // Set token expiration time in state
          setTokenExpiration(timeUntilExpiration);

        } else {
          // Token is expired, clear it
          console.log("Token has expired, clearing JWT.");
          localStorage.removeItem('jwt');
          setLoggedIn(false);
          setUser(null);
          alert("Your session has expired. Please log in again.");
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUser(null);
      }
    } else {
      // No token, set to logged out state
      setLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Logs out the user when the token expires
  useEffect(() => {
    if (tokenExpiration) {
      const timer = setTimeout(() => {
        console.log("Token has expired, logging out.");
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUser(null);
        alert("Your session has expired. Please log in again.");
      }, tokenExpiration); 

      return () => clearTimeout(timer); 
    }
  }, [tokenExpiration]);

  return (
    // Sets routes for app navigation and passes props to the necessary components
    <>    
    <div className="App">
      <Router>
        <PageWrapper loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user={user}>                   
          <ScrollToHash/>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact user={user} />} />
            <Route path="/kits" element={<Kits user={user} />} />
            <Route path="/orders" element={<RequestKit user={user} setUser={setUser} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>
            <Route path="/confirmation" element={<Confirmation user={user}/> } />
            <Route path="/donation" element={<Donation user={user}/>} />
            <Route path="/speaker" element={<RequestSpeaker/>}/>
            <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />} />
            <Route path="/new_forms" element={<NewForms/>} >
              <Route path="add_user" element={<AddNew header="Add New User"><NewUser /></AddNew>} />
              <Route path="add_kit" element={<AddNew header="Add New Kit"><NewKit /></AddNew>} />
              <Route path="add_kit_item" element={<AddNew header="Add New Kit Item"><NewKitItem /></AddNew>} />
              <Route path="add_item_to_kit" element={<AddNew header="Add New Kit Item To Kit"><AddItemToKit /></AddNew>} />
            </Route>
            <Route path="/profile/:id" element={<UserProfile/>}/>
            <Route path="/users/:id/edit" element={<EditProfileForm />} />
          </Routes>
        </PageWrapper>
      </Router>
    </div>
  </>
  );
}

export default App;
