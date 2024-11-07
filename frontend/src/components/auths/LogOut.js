import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTokenValidity } from './services/AuthorService';

const LogOut = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = checkTokenValidity();
        if (token) {
            setToken(token);
        }
    }, [navigate]);

    const logOut = () => {
        localStorage.removeItem('jwtToken');
        navigate('/admin/login');
        setToken(null);
    }

    if (!token) return;

    return (
        <button className="btn btn-danger float-end" onClick={logOut}>Log Out</button>
    )
}
export default LogOut;