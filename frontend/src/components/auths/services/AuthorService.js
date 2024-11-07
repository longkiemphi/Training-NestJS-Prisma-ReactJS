import { jwtDecode } from 'jwt-decode';


export const checkTokenValidity = () => {
    const localStorage = window.localStorage;
    const savedToken = localStorage.getItem('jwtToken');

    if (savedToken) {
        try {
            const decodedToken = jwtDecode(savedToken);
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp && decodedToken.exp > currentTime) {
                return savedToken; // Token is valid
            }
        } catch (error) {
            // Invalid token
        }
    }
    return null;
};

export const redirectToLoginIfTokenInvalid = (navigate) => {
    const savedToken = checkTokenValidity()
    if (savedToken) {
        return savedToken; // Token is valid, return it
    } else {
        // Token is invalid or expired, redirect to login page
        localStorage.removeItem('jwtToken'); // Remove the invalid or expired token
        navigate('/admin/login');
    }
    return null;
};


export const handleRedirectIfLoggedIn = (navigate) => {
    const savedToken = checkTokenValidity()
    if (savedToken) {
        navigate('/admin'); // Token is valid, redirect to admin page
    }
};
