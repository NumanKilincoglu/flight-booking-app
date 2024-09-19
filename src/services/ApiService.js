import axios from 'axios';

const baseURL = 'http://localhost:3003/api/';

const apiInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default apiInstance