import './App.css';
import { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import PageWrapper from './components/PageWrapper';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Kits from './components/pages/Kits';
import RequestKit from './components/pages/RequestKit'
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import ScrollToHash from './components/ScrollToHash';
import Confirmation from './components/pages/Confirmation';
import Donation from './components/pages/Donation';
import RequestSpeaker from './components/pages/RequestSpeaker';
import AdminDashboard from './components/pages/AdminDashboard';
import NewForms from './components/NewForms';
import NewKit from './components/NewKit';
import NewUser from './components/NewUser';
import AddNew from './components/pages/AddNew';
import NewKitItem from './components/NewKitItem';
import AddItemToKit from './components/AddItemToKit';
import UserProfile from './components/pages/UserProfile';
import { AuthContext } from './components/auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';





function App() {
  const { loggedIn, user } = useContext(AuthContext);


  return (
    // Sets routes for app navigation and passes props to the necessary components
    <>    
    <div className="App">
        <PageWrapper>                   
          <ScrollToHash/>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="confirmation" element={<Confirmation /> } />
            <Route path="/kits" element={<Kits />} />
            <Route path="/orders" element={<RequestKit />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/speaker" element={<RequestSpeaker/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/authenticated/*" element={
              <ProtectedRoute>
                <Routes>                  
                  <Route path="donation" element={<Donation />} />             
                  <Route path="admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
                  <Route path="new_forms/*" element={<NewForms/>} >
                    <Route path="add_user" element={<AddNew header="Add New User"><NewUser /></AddNew>} />
                    <Route path="add_kit" element={<AddNew header="Add New Kit"><NewKit /></AddNew>} />
                    <Route path="add_kit_item" element={<AddNew header="Add New Kit Item"><NewKitItem /></AddNew>} />
                    <Route path="add_item_to_kit" element={<AddNew header="Add New Kit Item To Kit"><AddItemToKit /></AddNew>} />
                  </Route>
                  <Route path="profile/:id" element={<UserProfile/>}/>
                </Routes>
              </ProtectedRoute>
            }/>
          </Routes>
        </PageWrapper>
    </div>
  </>
  );
}

export default App;
