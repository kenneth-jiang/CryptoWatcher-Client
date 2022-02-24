import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:8081";
} else if (process.env.NODE_ENV === "production") {
    baseUrl = "https://cryptowatcher-server.herokuapp.com";
};

const request = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default request;