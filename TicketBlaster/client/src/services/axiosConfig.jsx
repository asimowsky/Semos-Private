import axios from "axios";

export const useAxiosClient = () => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_DATABASE_URL,
    timeout: 5000,
  });

  return client;
};
