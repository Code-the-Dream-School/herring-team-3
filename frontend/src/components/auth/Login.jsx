import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL2 } from "../../constants";
import { Link } from "react-router-dom";
import CurrentUser from "./CurrentUser";
import { AuthContext } from "./AuthContext";



export default function Login() {
    // Handles login, setting the data for the user
    const { setLoggedIn, logout } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [loginMessages, setLoginMessages] = useState("");
    const navigate = useNavigate();
    
  
  
    const [userData, setUserData] = useState({});
  
    const loginUrl = `${API_URL2}/login`;
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Form submitted");
  
      // Update the userData state
      const updatedUserData = {
          user: {
            email,
            password,
          },
        };
  
      setUserData(updatedUserData);
  
      try {
        // Send POST request to registration endpoint
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });
  
        if (response.ok) {
          // Handle successful registration 
          const data = await response.json()
          const jwt = response.headers.get('Authorization');
      if (jwt) {
        // Store the JWT in local storage 
        localStorage.setItem('jwt', jwt.split(' ')[1]);
      }

          console.log("Login successful!");
          
          setLoggedIn(true);
  
          navigate("/")
        } else {
          // Handle registration error
          const errorData = await response.json();
          setLoginMessages('Login failed. Please check your credentials and try again.');
          

      // Access the status and message in the JSON response
      console.log('Error Code:', errorData.status.code);
      console.log('Error Message:', errorData.status.message);
        }
     } catch (error) {
        // Handle other errors
        console.log("An error occurred:", error)
        setLoginMessages("An error occurred, please try again.");
        setLoginMessages("An error occurred, please try again.");
        logout();
      }
    };
  
    return (
      // Displays registration form
      <div>
        <section className="page-section" id="register">
          <div className="container mt-5 p-5 rounded bg-light w-50"  style={{
            boxShadow: '25px 25px 55px rgba(0, 0, 0, 0.5)', 
            borderTop: '1.5px solid rgba(255, 255, 255, 0.5)',
            borderLeft: '1.5px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px) '
            }}>
            <div className="text-center mb-5">
              <h2 className="section-heading text-uppercase text-dark">Login</h2>
            </div>
            
            <div className={loginMessages ? "text-center text-danger text-bold mb-3" : "d-none"} id="submitErrorMessage">
              {loginMessages && <p>{loginMessages}</p>}
              </div>
  
            <form
              id="registerForm"
              onSubmit={handleSubmit}
              
            >
            <div>
              <div className="container w-80">
              <div className="mb-5">
                <div className="form-group">
                    <input
                      className="form-control shadow"
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email *"
                      data-sb-validations="required,email"
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="email:required"
                    >
                      An email is required.
                    </div>
                    <div className="invalid-feedback" data-sb-feedback="email:email">
                      Email is not valid.
                    </div>
                  </div>
                  <div className="form-group mb-md-0">
                    <input
                      className="form-control shadow"
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password *"
                      data-sb-validations="required"
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="password:required"
                    >
                      A password is required.
                    </div>
                  </div>
                </div>
              </div>
              </div>
               <div className="text-center">
                <button
                  className="btn btn-primary btn-lg text-uppercase mb-3 shadow"
                  id="submitButton"
                  type="submit"
                >
                  Submit
                </button>
                <Link to="/registration"><p>Not registered? Sign up now.</p></Link>
              </div>
              
            </form>
          </div>
        </section>
      </div>
  
    );
  }
