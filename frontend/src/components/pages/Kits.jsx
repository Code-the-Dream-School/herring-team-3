import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

function Kits() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const kitsUrl = `${API_URL}/kits`;

  useEffect(() => {
    async function loadKits() {
      try {
        const response = await fetch(kitsUrl);
        if (response.ok) {
          const json = await response.json();
          console.log("Fetched kits data:", json);
          setKits(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred.");
        console.log("An error occurred", e);
      } finally {
        setLoading(false);
      }
    }
    loadKits();
  }, [kitsUrl]);

  return (
    <>
      <div>
        <section className="page-section bg-light" id="portfolio">
          <div className="container">
            <div className="text-center">
              <h2 className="section-heading text-uppercase">Available Kits</h2>
              <h3 className="section-subheading text-muted">
                Browse our collection of curated learning kits.
              </h3>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="row d-flex p-1">
              {kits.map(
                (
                  kit // Map through the list of kits
                ) => (
                  <>
                    <div className="col-lg-6 col-sm-6 mb-4">
                      <div className="portfolio-item" key={kit.id}>
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
                            alt="..."
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
                          <Link to="/kit_request">
                            <button className="btn btn-primary btn-small">
                              Request Kit
                            </button>
                          </Link>
                        </div>

                        <div
                          class="portfolio-modal modal fade"
                          id={`portfolioModal${kit.id}`}
                          tabindex="-1"
                          role="dialog"
                          aria-hidden="true"
                          key={kit.id}
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="close-modal" data-bs-dismiss="modal">
                                <img
                                  src="assets/img/close-icon.svg"
                                  alt="Close modal"
                                />
                              </div>
                              <div class="container">
                                <div class="row justify-content-center">
                                  <div class="col-lg-8">
                                    <div class="modal-body">
                                      <h2 class="text-uppercase">{kit.name}</h2>
                                      <p class="item-intro text-muted">
                                        {kit.description}
                                      </p>

                                      {/* Carousel for kit_items */}
                                      <div
                                        id={`carouselKitItems${kit.id}`}
                                        className="carousel slide"
                                        data-ride="carousel"
                                      >
                                        <div className="carousel-inner">
                                          {kit.kit_items.map((item, index) => (
                                            <div
                                              key={item.id}
                                              className={`carousel-item ${
                                                index === 0 ? "active" : ""
                                              }`}
                                            >
                                              <img
                                                src={
                                                  item.image_url ||
                                                  "/assets/img/portfolio/default.jpg"
                                                }
                                                className="d-block w-100"
                                                alt={item.name}
                                              />
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
                                          data-slide="prev"
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
                                          data-slide="next"
                                        >
                                          <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                          ></span>
                                          <span className="sr-only">Next</span>
                                        </a>
                                      </div>

                                      <button
                                        class="btn btn-primary btn-xl text-uppercase"
                                        data-bs-dismiss="modal"
                                        type="button"
                                      >
                                        <i class="fas fa-xmark me-1"></i>
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
                  </>
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
