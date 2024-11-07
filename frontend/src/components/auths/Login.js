import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { handleRedirectIfLoggedIn } from './services/AuthorService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const authApiUrl = process.env.REACT_APP_API_URL_AUTH;
    useEffect(() => {
        handleRedirectIfLoggedIn(navigate);
    }, [navigate]);

    const onLoginSubmit = (data) => {
        // Call API to login and get token
        axios
            .post(`${authApiUrl}`, data)
            .then((response) => {
                const { accessToken } = response.data;
                window.localStorage.setItem('jwtToken', accessToken);
                navigate('/admin'); // Redirect to admin page after successful login
            })
            .catch((error) => {
                // Handle and display login error to the user
                if (error.response) {
                    console.log(error.response.data.message);
                    toast(error.response.data.message);
                } else {
                    toast('Cannot connect to the server, please check your network connection.');
                }
            });
    };


    return (
        <div className="container mt-5">
            <ToastContainer />
            <LoginForm onSubmit={onLoginSubmit} />
        </div>
    );
};

export default Login;
