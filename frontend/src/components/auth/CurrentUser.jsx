import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const CurrentUser = () => {
    const { user } = useContext(AuthContext);
    
    if (!user) return null;

    return (
        // Displays a welcome message and if admin, a link to access admin dashboard.
        <div className='m-0 p-0 d-inline-flex'>
            <p className='text-white bold' style={{ marginRight: 100 }}>
            <em>Welcome, {user.first_name}!</em>
            </p>
            {user && user.role === 'admin' && <Link to="/admin"><i className="fas fa-user-shield"></i>
                </Link>}
        </div>
    );
};

export default CurrentUser;
