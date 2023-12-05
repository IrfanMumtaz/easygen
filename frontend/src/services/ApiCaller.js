import axios from 'axios';
import config from '../Configs';

const BASE_URL = config.base_url;
const Axios = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
});

// Request interceptor
Axios.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers, authentication tokens)
        const accessToken = localStorage.getItem('token');

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
            if (config.headers)
                config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        // Handle request errors here

        return Promise.reject(error);
    }
);

// Response interceptor
Axios.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)
        if (response.status == 401) {
            try {
                localStorage.removeItem('token');
                window.location.href = '/sign-in';
            } catch (err) {
                console.warn(err);
            }
        }
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/sign-in';
        }
        // Handle response errors here

        return Promise.reject(error);
    }
);

const Post = async ({ url = '', body = {}, headers = {} }) => {
    return Axios.post(BASE_URL + url, body, {
        headers: {
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            ...headers,
        },
    })
        .then((res) => res)
        .catch((err) => err);
};

const ApiCaller = {
    Post,
};
export default ApiCaller;
