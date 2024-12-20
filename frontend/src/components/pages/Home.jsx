import React from 'react'
import Header from '../Header';
import { Link } from 'react-router-dom';



function Home() {

  return (
    // Displays home page
    <>
        <Header/>
        <section className="page-section" id="services">
            <div className="container">
                <div className="text-center">
                <h2 className="section-heading text-uppercase mb-5">Services</h2>
                    <h3 className="section-heading">Building Inclusive Classrooms, One Kit at a Time</h3>
                    <h4 className="section-subheading text-muted fs-6">Empower your students with tools that foster understanding and inclusion.</h4>
                    <p className='m-5 text-start text-muted'>Welcome to Project AWARE, where we believe that every student deserves to feel understood, valued, and supported. We provide educators with grade-appropriate resources that highlight the importance of neurodiversity—celebrating the unique ways each student thinks, learns, and thrives.</p>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            
                            <i className="fas fa-box fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Customized Kits</h4>
                        <p className="text-muted">We provide personalized kits that cater to different age groups and learning needs, helping educators introduce neurodiversity awareness into their classrooms with storybooks, lesson plans, and activities.</p>
                        <Link className="btn btn-primary btn-small text-uppercase" to="/kits">Browse Kits</Link>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Invite an Expert</h4>
                        <p className="text-muted">We offer the opportunity for schools to host expert speakers on neurodiversity. Our engaging talks are designed to enrich your educational environment with valuable insights and knowledge about neurodiversity.</p>
                        <Link className="btn btn-primary btn-small text-uppercase" to="/speaker">Request a Speaker</Link>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-donate fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Support Our Mission</h4>
                        <p className="text-muted">Your generous donations provide free kits for teachers, including books and lesson plans that educate and raise awareness about neurodiversity, fostering inclusivity and understanding in the classroom. Your support also helps bring inspiring guest speakers to schools across the country, further promoting a more inclusive educational environment.</p>
                        <Link className="btn btn-primary btn-small text-uppercase" to="/donation">Donate Now</Link>
                    </div>
                    
                </div>
            </div>
        </section>
        <section className="page-section bg-light" id="team">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                    
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src="assets/img/team/1.jpg" alt="..." />
                            <h4>Parveen Anand</h4>
                            <p className="text-muted">Executive Director & Founder</p>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src="assets/img/team/2.jpg" alt="..." />
                            <h4>Diana Petersen</h4>
                            <p className="text-muted">Program Director</p>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="team-member">
                            <img className="mx-auto rounded-circle" src="assets/img/team/3.jpg" alt="..." />
                            <h4>Larry Parker</h4>
                            <p className="text-muted">Development Director</p>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Twitter Profile"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 mx-auto text-center"><p className="large text-muted">Our amazing team is dedicated to making a meaningful impact in education and fostering inclusivity. Led by Executive Director & Founder Parveen Anand, Program Director Diana Petersen, and Development Director Larry Parker, each member brings a unique blend of expertise and passion to our mission. Together, we work tirelessly to provide educators with the resources and support they need to create inclusive learning environments for all students, especially those who are neurodiverse.</p></div>
                </div>
            </div>
        </section>
        <div className="text-center mt-5 pt-5">
                    <h4 className="section-heading text-uppercase text-muted">Special Thanks to Our Platinum Sponsors</h4>
                    
                </div>
        <div className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/microsoft.svg" alt="..." aria-label="Microsoft Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/google.svg" alt="..." aria-label="Google Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/facebook.svg" alt="..." aria-label="Facebook Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/ibm.svg" alt="..." aria-label="IBM Logo" /></a>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
export default Home;