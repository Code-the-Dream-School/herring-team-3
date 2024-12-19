import React, { useContext, useState } from "react";
import { API_URL2 } from "../../constants";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Stretch Goal: Alert user to token expiration and allow auto re-login
  // Handles log out, fetches api with token and logs out of account. If there is no token, it redirects to login page. It also checks for token expiration.
  const handleLogout = async () => {
    const logoutUrl = `${API_URL2}/logout`
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      alert('You are already logged out or your session has expired.');
      logout();
      return;
    }

    try {

      // Decode the token to check expiration
      const decoded = jwtDecode(jwt);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        alert('Your session has expired. Please log in again.');
        logout();
        return;
      }
        const response = await fetch(logoutUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });

      if (response.ok) {
        alert('Logged out successfully.');
        logout();
        
        console.log("Logout successful.")

      } else {
        const message = response.json();
        console.error(message.error.message);
        logout();
        alert("Your session has expired, please sign in again.");

    }

    } catch (error) {
        console.error("An error occurred:", error.message);
        logout();
        alert(error.message)
    }
    
  };

  return (
    <>    
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
    </>
  );
}
