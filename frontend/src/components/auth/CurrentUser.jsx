import React, { useEffect, useState } from 'react';
import { API_URL2 } from '../../constants';
import { Link } from 'react-router-dom';

const CurrentUser = ({ setLoggedIn, setUser, user }) => {
    
    const userUrl = `${API_URL2}/current_user`
    // Fetches the current user whenever someone logs in
    useEffect(() => {
        const fetchUser = async () => {
            if(!user) {
            try {
                const response = await fetch(userUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.log("No user logged in.")
                    setUser(null);
                    const error = await response.json()
                    console.log(error)
                }
            } catch (error) {
                console.error("Error fetching current user");
            }
        }};

        fetchUser();
    }, [setLoggedIn, user, setUser, userUrl]);
    // Stretch Goal: Add admin dashboard
    if (!user) return null;

    return (
        // Displays a welcome message and if admin, a link to access admin dashboard.
        <div className='m-0 p-0 d-inline-flex'>
            <p className='text-white bold' style={{ marginRight: 100 }}>
            <em>Welcome, {user.first_name}!</em>
            </p>
            {user.role === 'admin' && <Link to="/admin"><i className="fas fa-user-shield"></i>
                </Link>}
        </div>
    );
};

export default CurrentUser;
