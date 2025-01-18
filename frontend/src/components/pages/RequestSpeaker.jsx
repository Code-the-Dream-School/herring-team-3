import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";


function RequestSpeaker() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userUrl = `${API_URL}/users`;
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await fetch(userUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
  
        // Extract the user attributes from the JSON:API response
        const usersData = data.data.map(user => ({
          id: user.id,
          ...user.attributes
        }));
  
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // useEffect to fetch users when the component mounts
    useEffect(() => {
      fetchUsers();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error)
      return <p>Error: Unable to fetch speakers. Please try again later.</p>;
  
    return (
      <div className="speaker-background">
        <div className="black-strip"></div>
        <section className="page-section">
          <div>
            <h1 className="text-center mt-5">Speakers</h1>
            <div className="container mt-5">
              <div className="row d-flex">
                {users
                  .filter((user) => user.role === "speaker")
                  .map((user) => (
                    <div className="col-lg-4 col-md-6 mb-5" key={user.id}>
                      <div className="speaker-card">
                        <div className="team-member">
                          <img
                            className="profile-image"
                            src={
                              user.profile_image_url || "assets/img/default-profile.png"
                            }
                            alt={`${user.first_name} ${user.last_name}`}
                          />
                          <div className="card-content">
                          <h4>{`${user.first_name} ${user.last_name}`}</h4>
                          <div className="text-start ms-3 me-3 mt-3">
                          <p className="card-bio"><strong>Bio:</strong> {user.bio ? user.bio : "The user has not provided a bio yet."}</p>
                          </div>
                          <Link className="btn btn-primary" to={`/authenticated/profile/${user.id}`}>
                            See My Profile
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default RequestSpeaker;