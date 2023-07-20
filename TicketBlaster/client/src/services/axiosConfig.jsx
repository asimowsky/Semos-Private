import axios from "axios";

export const useAxiosClient = () => {
    const client = axios.create({
        baseURL: process.env.REACT_APP_DATABASE_URL,
        timeout: 5000,
    });

    client.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem("accessToken") || "";
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return client;
};
