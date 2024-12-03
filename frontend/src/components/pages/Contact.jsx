import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';


function Contact({ user }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const contactUrl = `${API_URL}/contacts`

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        // If the user is signed in, user name and email are auto populated in the form
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation that all fields are populated
        if (!name || !email || !message) {
            setErrorMessages("All fields are required.");
            return;
        }
    
        try {
            // Sends data entered on form to the backend
            const response = await fetch(contactUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, message }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessages(errorData.errors.join(", "));
            } else {
                // Handle success, clear the form
                // Added code to clear first and last name
                console.log(response.json)
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                setErrorMessages("");
                alert("Contact submitted successfully!");
            }
        } catch (error) {
            setErrorMessages("An error occurred. Please try again.");
        }
    };

  return (
    // Displays contact form
    <div>
        <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center mt-5">
                    <h2 className="section-heading text-uppercase">Contact Us</h2>
                    <h3 className="section-subheading text-white">Tell Us What's On Your Mind!</h3>
                </div>
                <div className={errorMessages ? "text-center text-danger text-bold mb-3" : "d-none"} id="submitErrorMessage">
              {errorMessages && <p>{errorMessages}</p>}
              </div> 
                <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="row align-items-stretch mb-5">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input className="form-control border border-dark me-3" name="name" id="name" type="text"
                                value={name} placeholder="Your Name *" autoComplete="name"
                                onChange={(e) => setName(e.target.value)} data-sb-validations="required" />
                                <div className="invalid-feedback" data-sb-feedback="name:required"
                                >A name is required.</div>
                            </div>
          
                            <div className="form-group">
                                <input className="form-control border border-dark" id="email" type="email" 
                                name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email *" data-sb-validations="required,email" />
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <div className="form-group mb-md-0">
                                <input className="form-control border border-dark" id="phone" type="tel"
                                name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your Phone *" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group form-group-textarea mb-md-0">
                                <textarea className="form-control border border-dark" id="message" name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message *" data-sb-validations="required"></textarea>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button></div>
                </form>
            </div>
        </section>

    </div>
  )
}
export default Contact;