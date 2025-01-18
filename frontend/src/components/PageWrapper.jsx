import React from 'react'
import Navigation from './Navigation';
import Footer from './Footer';

// Passed in the content for the middle of the page as children. Navbar and footer displayed on every page.
const PageWrapper = ({children }) => {

    return (
    <div id="page-top">
    <Navigation />
    {children}     
    <Footer/>
    </div>
    );
  
};

export default PageWrapper;
