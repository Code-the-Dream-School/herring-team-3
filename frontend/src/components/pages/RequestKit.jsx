import React, { useEffect, useState, useContext } from "react";
import { API_URL } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import * as Yup from "yup";
import Address from "../Address";


function RequestKit() {
  const { user } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Phone is required'),
    schoolYear: Yup.string().required('School year is required'),
    comments: Yup.string()
    .notRequired()
    .max(500, 'Comments cannot exceed 500 characters'),
  });

  const location = useLocation();
  const kitId = location.state?.kitId || "";
  const kitName = location.state?.kitName || "";
  

  const [orderMessages, setOrderMessages] = useState("");  
  const [productType, setProductType] = useState('Kit'); // Default to 'kit'
  const [productId, setProductId] = useState(null);
  const ordersUrl = `${API_URL}/orders`;
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (kitId) {
      setProductId(kitId);
    }
  }, [kitId]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  },
  [user]);

  const [address, setAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    save_to_user: false,
  });

  const [orderForm, setOrderForm] = useState({
    phone: "",
    comments: "",
    schoolYear: "",
    email: user ? user.email : "",
    firstName: user ? user.first_name : "",
    lastName: user ? user.last_name : "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddressSelect = (selectedAddress) => {
    setOrderForm({
      ...orderForm,
      streetAddress: selectedAddress.street_address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      postalCode: selectedAddress.postal_code,
      save_to_user: false
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the address based on the street address entered in the form
    const selectedAddress = user.addresses.find(
      (address) => address.street_address === orderForm.streetAddress
    );
    const addressId = selectedAddress ? selectedAddress.id : null;

    const data = {
      order: {
        user_id: user.id,
        address_id: addressId,
        phone: orderForm.phone,
        school_year: orderForm.schoolYear,
        product_id: productId,
        product_type: productType,
        comments: orderForm.comments,
        address_attributes: {
          street_address: orderForm.streetAddress,
          city: orderForm.city,
          state: orderForm.state,
          postal_code: orderForm.postalCode,
          addressable_type: "User",
          addressable_id: user.id,
        },
      },
    };

    try {
      // Send POST request to registration endpoint
      await validationSchema.validate(orderForm, { abortEarly: false });
      const response = await fetch(ordersUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful registration
        console.log("Order saved.");
        alert("Your order has been processed.");

        navigate("/confirmation");
      } else {
        // Handle request error
        const errorData = await response.json();
        const errorMessages = errorData.errors.map((error) => {
          return error.replace("School year ", "");
        });
        setOrderMessages(errorMessages.join(", ") || "Order failed");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const newErrors = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setOrderMessages(newErrors);
      } else {
        // Handle network or other errors
        setOrderMessages({general: "Network error: " + error.message});
        logout();
      }
      console.error(error);
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
                Order Form
              </h4>
            </div>

            <div
              className={
                orderMessages.general
                  ? "text-center text-danger text-bold mb-3"
                  : "d-none"
              }
              id="submitErrorMessage"
            >
              {orderMessages.general && <p>{orderMessages.general}</p>}
            </div>

            <form
              id="registerForm"
              onSubmit={handleSubmit}
            >
              <div className="container text-dark">
                <div className="mb-5">
                  <div>
                    <div className="form-group mb-3">
                      {/* Added input fields for first name and last name*/}
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        className="form-control shadow"
                        id="firstName"
                        name="firstName"
                        value={orderForm.firstName}
                        readOnly
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        className="form-control shadow"
                        id="lastName"
                        name="lastName"
                        value={orderForm.lastName}
                        readOnly
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email:</label>
                      <input
                        className="form-control shadow"
                        id="email"
                        type="email"
                        name="email"
                        value={orderForm.email}
                        readOnly
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="phone">Phone:</label>
                      <input
                        className="form-control shadow"
                        id="phone"
                        type="tel"
                        name="phone"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({...orderForm, phone:e.target.value})}
                        placeholder="123-456-7890*"
                        
                      />
                      {orderMessages.phone && <div className="text-center text-danger text-bold mt-3 mb-3">{orderMessages.phone}</div>}
                    </div>
                    <div className="form-group mb-3">
                      <Address user={user} onAddressSelect={handleAddressSelect} />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="schoolYear">School Year:</label>
                    <input
                      className="form-control shadow"
                      id="schoolYear"
                      type="text"
                      name="schoolYear"
                      value={orderForm.schoolYear}
                      onChange={(e) => setOrderForm({...orderForm, schoolYear:e.target.value})}
                      placeholder="YYYY-YYYY*"
                      
                    />
                    {orderMessages.schoolYear && <div className="text-center text-danger text-bold mt-3 mb-3">{orderMessages.schoolYear}</div>}
                    <div className="form-group mb-3">
                      <label htmlFor="kitName">Kit Name:</label>
                      <input
                        className="form-control shadow"
                        id="kitName"
                        type="text"
                        name="kitName"
                        value={kitName}
                        readOnly
                      />
                    </div>
                    <div className="form-group form-group-textarea mb-md-0">
                      <label htmlFor="comments">Order Comments:</label>
                      <textarea
                        className="form-control shadow mb-5"
                        id="comments"
                        name="comments"
                        type="text"
                        value={orderForm.comments}
                        onChange={(e) => setOrderForm({...orderForm, comments:e.target.value})}
                        placeholder="Your Message *"
                      ></textarea>
                      {orderMessages.comments && <div className="text-center text-danger text-bold mt-3 mb-3">{orderMessages.comments}</div>}
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
