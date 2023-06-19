import { useNavigate } from "react-router-dom";
import { useAxiosClient } from "./axiosConfig";

export const AuthService = () => {
  const axios = useAxiosClient();
  const navigate = useNavigate();

  const loginAuth = async (body) => {
    try {
      const response = await axios.post(`/api/auth/login`, body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createAccount = async (body) => {
    try {
      const response = await axios.post("/api/auth/register", body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    navigate("/login");
  };

  return {
    loginAuth,
    logout,
    createAccount,
  };
};
