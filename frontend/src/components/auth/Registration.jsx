import React, { useState } from "react";
import { API_URL2 } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Set useState for isTeacher with a default value of false
  const [isTeacher, setIsTeacher] = useState(false);
  // Removed useState for name and added for firstName, lastName
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationMessages, setRegistrationMessages] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const registrationUrl = `${API_URL2}/signup`;

  // Toggles the isTeacher state and logs to console
  const handleClick = () => {
    setIsTeacher((prevIsTeacher) => !prevIsTeacher);
  };
  // Handles initial signup, sets default role as user since only admin can assign a user as admin. Uses a POST action to sign up new user.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    // Update the userData state
    const updatedUserData = {
      user: {
        email,
        password,
        // if isTeacher is true, then role set as teacher, otherwise, user
        role: isTeacher ? "teacher" : "user",
        // Removed name, and added firstName and lastName, mapped name details to column names
        first_name: firstName,
        last_name: lastName,
        },
      };

    setUserData(updatedUserData);

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
        // Handle successful registration (e.g., redirect to another page)
        console.log("Registration successful!");
        setRegistrationMessages("Registration successful!");

       // Clear input fields
      setEmail("");
      setPassword("");
      // Removed name field and added firstName and lastName field
      setFirstName("");
      setLastName("");

        navigate("/login");
      } else {
        // Handle registration error
        const errorData = await response.json();
        setRegistrationMessages(
          errorData.status.errors.join(", ") || "Registration failed"
        );
      }
    } catch (error) {
      // Handle network or other errors
      setRegistrationMessages("An error occurred: " + error.message);
      console.log(error.message);
    }
  };

  return (
    // Displays form for registration
    <div>
      <section className="page-section" id="register">
        <div
          className="container mt-5 p-5 rounded bg-light w-50"
          style={{
            boxShadow: "25px 25px 55px rgba(0, 0, 0, 0.5)",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.5)",
            borderLeft: "1.5px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px) ",
          }}
        >
          <div className="text-center mb-5">
            <h2 className="section-heading text-uppercase text-dark">
              Register
            </h2>
          </div>

          <div
            className={
              registrationMessages
                ? "text-center text-danger text-bold mb-3"
                : "d-none"
            }
            id="submitErrorMessage"
          >
            {registrationMessages && <p>{registrationMessages}</p>}
          </div>

          <form
            id="registerForm"
            data-sb-form-api-token="API_TOKEN"
            onSubmit={handleSubmit}
          >
            {/* Added first and last name fields */}
            <div className="container">
            <div className="mb-5">
              <div>
                <div className="form-group d-flex justify-content-between">
                  <input
                    className="form-control shadow me-3"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your First Name *"
                    data-sb-validations="required"
                  />
                 
                  <input
                    className="form-control shadow"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your Last Name *"
                    data-sb-validations="required"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="firstName:required"
                  >
                    A name is required.
                  </div>
                
                </div>
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

                    {/* Added checkbox for teacher role */}
                    <div className="form-check">
                      <input
                        className="form-check-input mt-3 me-3"
                        type="checkbox"
                        id="isTeacher"
                        checked={isTeacher}
                        onChange={handleClick}
                      />
                      <label className="form-check-label mt-4 text-muted" htmlFor="isTeacher">
                        <strong>I am a teacher</strong>
                      </label>
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
              <Link to="/login">
                <p>Already signed up? Login now.</p>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
