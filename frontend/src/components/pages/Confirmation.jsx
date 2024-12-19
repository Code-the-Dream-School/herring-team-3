import React, {useContext, useEffect} from "react";
import { AuthContext } from "../auth/AuthContext";



function Confirmation() {
    const { user } = useContext(AuthContext);
    // Displays confirmation for kit request success
    const current_user = user?.name || "Guest";

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
        <section id="confirmation" >
         <div className="container border bg-white w-60 h-100 p-5 rounded" style={{marginTop: 40}}>
            <div className="text-center">
                <h4 className="section-heading text-uppercase">Thank You, {current_user} for requesting one of our kits!</h4>
                <h5 className="section-subheading mb-5">We hope you and your students enjoy it.</h5>
                <h5 className="text-muted">You will be receiving an email confirmation soon.</h5>
                
                    
            </div>
        </div>  
        </section>     
        </>
    )
    
}

export default Confirmation;