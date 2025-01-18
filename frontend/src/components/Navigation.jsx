import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import CurrentUser from "./auth/CurrentUser";
import { AuthContext } from "./auth/AuthContext";
import Logout from "./auth/Logout";

// Passed in logged in and user state
function Navigation() {
   const { loggedIn, user } = useContext(AuthContext);
   const navigate = useNavigate();
   const handleDonateClick = (e) => {
    e.preventDefault(); 

    // Checks if the user is logged in to prevent or allow navigation to the donation page
    if (!user) {
        // If user not logged in, navigate to login page
        alert("You must be logged in to make a donation. Please log in or register if you haven't already.");
        navigate("/login");
    } else {
        // If user is logged in, navigate to the donation page
        navigate("/authenticated/donation");
    }
};
    return (
        // Displays navbar, checks if user logged in to display welcome message and logout button or login link
        <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="true" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        {loggedIn && (
                        <>
                        <li className="nav-item"><span className="nav-link"><CurrentUser /></span></li>

                        </>
                        )}
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#services">Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#team">Team</a></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/kits">Kits</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#" onClick={handleDonateClick}>Donate</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                        
                        
                        
                        {loggedIn ? (
                            <>
                            <li><Logout /></li>
                            </>
                        ) : (
                            <>                            
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>
                        )}
                                             
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
};
export default Navigation;