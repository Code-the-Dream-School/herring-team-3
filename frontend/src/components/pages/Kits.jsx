import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Kits() {
  const { user } = useContext(AuthContext);
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const kitsUrl = `${API_URL}/kits`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Loads kits from the backend with associated images
    async function loadKits() {
      try {
        const response = await fetch(kitsUrl);
        if (response.ok) {
          const json = await response.json();
          setKits(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred.");
        console.log("An error occurred", e);
        setLoggedIn(false);
        setUser(null);
        localStorage.removeItem('jwt');
      } finally {
        setLoading(false);
      }
    }
    loadKits();
  }, [kitsUrl]);

  return (
    // Displays kit page
    <>
    <div className="black-strip"></div>
      <div>
        <section className="page-section bg-light" id="portfolio">
          <div className="container">
            <div className="text-center">
              <h2 className="section-heading text-uppercase">Available Kits</h2>
              <h3 className="section-subheading text-muted">
              Get the materials you need to promote neurodiversity awareness in your classroom.
              </h3>
            </div>
            <div className="container mb-5 text-center" id="services" style={{ width: 750}}>
              <p>Teachers, we know how important it is to create a classroom that supports all learners. That's why we're offering free neurodiversity awareness kits, filled with resources to help you introduce students to the concepts of neurodivergence in a positive, engaging way.</p>  

              <p>Each kit includes grade-appropriate materials like:</p>
              <ul style={{textAlign: "center", listStylePosition: "inside", padding: 0, marginBottom: 20}}>
              <li>Books that feature neurodivergent characters</li>
              <li>Lesson plans that encourage understanding and empathy</li>
              <li>Classroom activities to promote inclusion and discussion</li>
              </ul>
              <p>Simply select the kit that's right for your grade level, and we'll send it directly to your school. Together, we can help every student feel like they belong.</p>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="row d-flex p-2">
              {kits.map(kit => (
                    <div className="col-lg-6 col-sm-6 mb-4" key={kit.id}>
                      <div className="portfolio-item">
                        <a
                          className="portfolio-link"
                          data-bs-toggle="modal"
                          data-bs-target={`#portfolioModal${kit.id}`}
                        >
                          <div className="portfolio-hover">
                            <div className="portfolio-hover-content">
                              <i className="fas fa-plus fa-3x"></i>
                            </div>
                          </div>
                          <img
                            className="portfolio-img img-fluid"
                            src={kit.image_url}
                            alt="Book covers"
                            style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}
                          />
                        </a>
                        <div className="portfolio-caption">
                          <div className="portfolio-caption-heading">
                            {kit.name}
                          </div>
                          <div className="portfolio-caption-subheading text-muted mb-3">
                            <p>Grades: {kit.grade_level}</p>
                            {kit.description}
                          </div>
                          
                          {user?.role == "teacher" ? (
                            <Link 
                              to="/orders" 
                              state={{ kitId: kit.id, kitName: kit.name }}
                              className="btn btn-primary btn-small"
                            >
                              Order {kit.name}
                            </Link>
                          ) : (
                            <>
                            <p><em>Please log in to place an order.
                            Only teachers may order kits.</em></p>
                            </>
                          )}

                          
                        </div>
                        <div>
                        <div
                          className="portfolio-modal modal fade"
                          id={`portfolioModal${kit.id}`}
                          tabIndex="-1"
                          role="dialog"
                          aria-hidden="true"
                          key={kit.id}
                          style={{ marginLeft: 100}}
                        >
                          <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                              <div className="close-modal" data-bs-dismiss="modal">
                                <img
                                  src="assets/img/close-icon.svg"
                                  alt="Close modal"
                                />
                              </div>
                              <div className="container">
                                <div className="row justify-content-center">
                                  <div className="col-lg-8">
                                    <div className="modal-body">
                                      <h2 className="text-uppercase">{kit.name}</h2>
                                      <p className="item-intro text-muted">
                                        {kit.description}
                                      </p>

                                      {/* Carousel for kit_items */}
                                      <div
                                        id={`carouselKitItems${kit.id}`}
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                      >
                                        <div className="carousel-inner bg-primary p-5 mb-5">
                                          {kit.kit_items.map((item, index) => (
                                            <div
                                              key={item.id}
                                              className={`carousel-item ${
                                                index === 0 ? "active" : ""
                                              }`}
                                            >
                                              <div className="carousel-img-container d-flex justify-content-center align-items-center">
                                              <img
                                                src={
                                                  item.image_url ||
                                                  "/assets/img/portfolio/default.jpg"
                                                }
                                                className="d-block w-50"
                                                alt={item.name}
                                              />
                                              </div>
                                              <div className="carousel-caption-bottom">
                                                <div className="caption-content">
                                                  <h5 className="text-dark">
                                                    {item.name}
                                                  </h5>
                                                  <p className="text-dark">
                                                    {item.description}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        <a
                                          className="carousel-control-prev"
                                          href={`#carouselKitItems${kit.id}`}
                                          role="button"
                                          data-bs-slide="prev"
                                        >
                                          <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                          ></span>
                                          <span className="sr-only">
                                            Previous
                                          </span>
                                        </a>
                                        <a
                                          className="carousel-control-next"
                                          href={`#carouselKitItems${kit.id}`}
                                          role="button"
                                          data-bs-slide="next"
                                        >
                                          <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                          ></span>
                                          <span className="sr-only">Next</span>
                                        </a>
                                      </div>

                                      <button
                                        className="btn btn-primary btn-xl text-uppercase mt-5"
                                        data-bs-dismiss="modal"
                                        type="button"
                                      >
                                        <i className="fas fa-xmark me-1"></i>
                                        Close Kit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Kits;
