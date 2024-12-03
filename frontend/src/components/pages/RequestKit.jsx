import React, { useEffect, useState } from "react";
import { API_URL, API_URL2 } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RequestKit({ user }) {
  const location = useLocation();
  const kitId = location.state?.kitId || "";

  const [requestMessages, setRequestMessages] = useState("");

  // Predefine name, email, and kitId
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [, setKitId] = useState(kitId || "");

  // Other inputs
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [comments, setComments] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const requestKitUrl = `${API_URL}/kit_requests`;
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      kit_request: {
        phone,
        school_address: schoolAddress,
        school_name: schoolName,
        school_year: schoolYear,
        kit_id: kitId,
        comments,
      },
    };

    console.log("Submitting form data: ", formData);
    console.log(jwt);
    if (!jwt) {
      console.log("No user logged in. Please log in to continue.");
      // Redirect to login
      navigate("/login");
      return;
    }

    try {
      // Send POST request to registration endpoint
      const response = await fetch(requestKitUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration
        console.log("Request saved.");
        alert("Your request has been processed.");

        // Clear input fields
        setPhone("");
        setSchoolName("");
        setSchoolYear("");
        setSchoolAddress("");
        setComments("");

        navigate("/confirmation");
      } else {
        // Handle request error
        const errorData = await response.json();
        const errorMessages = errorData.errors.map((error) => {
          return error.replace("School year ", "");
        });
        setRequestMessages(errorMessages.join(", ") || "Request failed");
      }
    } catch (error) {
      // Handle network or other errors
      setRequestMessages("An error occurred: " + error.message);
      console.log(error);
    }
  };

  return (
    // Displays form for requesting a kit
    <>
      <div className="black-strip"></div>
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
              <h4 className="text-center section-heading text-uppercase text-dark">
                Request A Kit
              </h4>
            </div>

            <div
              className={
                requestMessages
                  ? "text-center text-dark text-bold mb-3"
                  : "d-none"
              }
              id="submitErrorMessage"
            >
              {requestMessages && <p>{requestMessages}</p>}
            </div>

            <form
              id="registerForm"
              data-sb-form-api-token="API_TOKEN"
              onSubmit={handleSubmit}
            >
              <div className="container text-dark">
                <div className="mb-5">
                  <div>
                    <div className="form-group">
                      {/* Added input fields for first name and last name*/}
                      <label for="firstName">First Name:</label>
                      <input
                        type="text"
                        className="form-control shadow"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label for="lastName">Last Name:</label>
                      <input
                        type="text"
                        className="form-control shadow"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        className="form-control shadow"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone:</label>
                      <input
                        className="form-control shadow mb-5"
                        id="phone"
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="123-456-7890*"
                        data-sb-validations="required"
                        required
                      />
                    </div>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="phone:required"
                    >
                      A phone number is required.
                    </div>
                    <div className="form-group">
                      <label htmlFor="schoolName">School Name:</label>
                      <input
                        className="form-control shadow mb-5"
                        id="schoolName"
                        type="text"
                        name="schoolName"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="City High School*"
                        data-sb-validations="required"
                        required
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="schoolName:required"
                      >
                        A school name is required.
                      </div>
                    </div>
                    {/* Stretch Goal: Integrate API with US schools? */}
                    <div className="form-group">
                      <label htmlFor="schoolAddress">School Address:</label>
                      <input
                        className="form-control shadow mb-5"
                        id="schoolAddress"
                        type="text"
                        name="schoolAddress"
                        value={schoolAddress}
                        onChange={(e) => setSchoolAddress(e.target.value)}
                        placeholder="123 Example Street, City, ST 12345*"
                        data-sb-validations="required"
                        required
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="schoolAddress:required"
                      >
                        A school address is required.
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="schoolYear">School Year:</label>
                    <input
                      className="form-control shadow mb-5"
                      id="schoolYear"
                      type="text"
                      name="schoolYear"
                      value={schoolYear}
                      onChange={(e) => setSchoolYear(e.target.value)}
                      placeholder="YYYY-YYYY*"
                      data-sb-validations="required"
                      required
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="schoolYear:required"
                    >
                      A school year is required.
                    </div>
                    <div className="form-group">
                      <label htmlFor="kitId">Kit Id:</label>
                      <input
                        className="form-control shadow mb-5"
                        id="kitId"
                        type="text"
                        name="kitId"
                        value={kitId}
                        readOnly
                      />
                    </div>
                    <div className="form-group form-group-textarea mb-md-0">
                      <label htmlFor="comments">Request Comments:</label>
                      <textarea
                        className="form-control shadow mb-5"
                        id="comments"
                        name="comments"
                        type="text"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Your Message *"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg text-uppercase mb-3"
                  id="submitButton"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default RequestKit;
