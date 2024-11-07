import axios from 'axios';

export const apiRequest = async (method, url, token, data = null) => {
    try {
        const response = await axios({
            method,
            url,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        });
        return response;
    } catch (error) {
        console.error(`Error during API request:`, error);
        throw error;
    }
};
