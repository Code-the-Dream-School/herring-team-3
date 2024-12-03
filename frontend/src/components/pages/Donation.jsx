import React, {useState, useEffect } from "react"
import { API_URL } from "../../constants"
import { useNavigate } from "react-router-dom"

function Donation({user}) {
    // Add useState for first name and last name
    const [errorMessages, setErrorMessages] = useState("");
    const [firstName, setFirstName] = useState(user ? user.first_name : "");
    const [lastName, setLastName] = useState(user ? user.last_name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();
    const [savePaymentInfo, setSavePaymentInfo] = useState(false);
    const donationsUrl = `${API_URL}/donations`
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }, []);
      // Sets name and email to user name and email if user signed in
    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        }
    }, [user]);

    // For amount buttons
    const handleAmountClick = (value) => {
        setAmount(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("First Name: ", firstName);
        console.log("Last Name: ", lastName);
        console.log("Email: ", email);
        console.log("Submitting donation of:", amount);
        console.log("Card Number:", cardNumber);
        console.log("Expiration Date:", expirationDate);
        console.log("CVV:", cvv);
        console.log("Save Payment info?: ", savePaymentInfo);
        
        const formData = {
            donation: {
            amount,
            payment_token: cardNumber,
            payment_status: "pending",       
            save_payment_info: savePaymentInfo,      
            
            }
  
          }
          console.log("Submitting form data: ", formData);
        
        if (!jwt) {
          console.log("No user logged in. Please log in to continue.");
          // Redirect to login
          navigate('/login')
          return;
      }
    

    try {
      // Send POST request to donation endpoint
      const response = await fetch(donationsUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration
        console.log("Donation saved.");
        alert("Donation submitted successfully. Thank you for your donation!")

        // Clear input fields
                
        setAmount("");
        setCardNumber("");
        setExpirationDate("");
        setCvv("");
        setSavePaymentInfo(false);

        navigate("/")
      } else {
        // Handle request error
        const errorData = await response.json();
       
        setErrorMessages(errorData.join(", ") || "Request failed");
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessages("An error occurred: " + error.message);
      console.log(error)
    }

        
    }    
    return (
        // Displays donation form
        <>
        <div className="black-strip"></div>
        <section className="page-section" id="register">
        <h2 className="text-center section-heading text-uppercase text-dark" style={{ fontSize: 32, marginTop: 80 }}>Support Our Mission to Make Classrooms More Inclusive</h2>
        <h3 className="text-center section-subheading" style={{ fontSize: 20 }}>Your donation helps provide free neurodiversity awareness kits to classrooms across the country.</h3>
        <div className="container mb-5 text-centered" style={{ width: 1000}}>
            <p>When you donate to Project Aware, you're helping create inclusive learning environments for students everywhere. Every contribution, big or small, allows us to provide free classroom kits filled with books, lesson plans, and materials that encourage neurodiversity awareness.</p>

            <p>These resources help teachers foster understanding, empathy, and acceptance in their classrooms, ensuring that neurodivergent students feel supported and valued. Your support can make a lasting difference in the lives of both teachers and students.</p>

            <p>Together, we can build a future where every child's unique learning style is celebrated.
            </p>
        </div>
          <div className="container mt-5 p-5 rounded bg-light w-75"  style={{
            boxShadow: '25px 25px 55px rgba(0, 0, 0, 0.5)', 
            borderTop: '1.5px solid rgba(255, 255, 255, 0.5)',
            borderLeft: '1.5px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px) '
            }}>

                <h4 className="text-center section-heading text-uppercase text-dark">Donation Form</h4>
        

        <div className={errorMessages ? "text-center text-danger text-bold mb-3" : "d-none"} id="submitErrorMessage">
              {errorMessages && <p>{errorMessages}</p>}
              </div>

        <form action="PAYMENT_PROCESSOR_URL" method="POST" id="registerForm" onSubmit={handleSubmit}>
            <div className="form-group">
                {/* Added input fields for first name and last name*/}
                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="form-control shadow" id="firstName" name="firstName" value={firstName} readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" className="form-control shadow" id="lastName" name="lastName" value={lastName} readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control shadow" id="email" name="email" value={email} readOnly/>
            </div>
            
           <div className="form-group">
                    <label htmlFor="amount">Donation Amount:</label>
                    <div className="d-flex align-items-center">
                        <div className="input-group mr-2 w-60" >
                            <div className="input-group-prepend shadow">
                                <span className="input-group-text"style={{ height: '100%' }}>$</span>
                            </div>
                            <input
                                type="text"
                                className="form-control shadow"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                placeholder="Enter amount"
                                 
                            />
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-primary btn-xl" onClick={() => handleAmountClick(10)} >
                                $10
                            </button>
                            <button type="button" className="btn btn-outline-primary btn-xl" onClick={() => handleAmountClick(50)}>
                                $50
                            </button>
                            <button type="button" className="btn btn-outline-primary btn-xl" onClick={() => handleAmountClick(100)} >
                                $100
                            </button>
                        </div>
                    </div>
                </div>
            <div className="text-center mt-4">
                    <h5>We Accept</h5>
                    <img src="/assets/img/donation/visa.png" alt="Visa" width="40" className="me-3" />
                    <img src="/assets/img/donation/mastercard.png" alt="MasterCard" width="40" className="me-3" />
                    <img src="/assets/img/donation/paypal.png" alt="PayPal" width="40" />
                </div>
                <h5>Payment Information</h5>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        placeholder="Enter card number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expirationDate"
                        name="expirationDate"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                        placeholder="MM/YY"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        placeholder="Enter CVV"
                    />
                </div>
                <div className="form-group mt-5">
                <label className="mb-3">Save Payment Information?</label>
                <div className="d-flex justify-space-between">
                <div className="form-check me-5">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="savePaymentInfo"
                        id="saveYes"
                        value="true"
                        checked={savePaymentInfo === true}
                        onChange={() => setSavePaymentInfo(true)}
                    />
                    <label className="form-check-label" htmlFor="saveYes">Yes</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="savePaymentInfo"
                        id="saveNo"
                        value="false"
                        checked={savePaymentInfo === false}
                        onChange={() => setSavePaymentInfo(false)}
                    />
                    <label className="form-check-label" htmlFor="saveNo">No</label>
                </div>
                </div>
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg text-uppercase mt-4 mb-3 shadow">Donate Now</button>
            </div>
        </form>
    </div>
    </section>
    </>
    )
    
}
export default Donation;