import { toast } from "react-hot-toast";
import { useAxiosClient } from "./axiosConfig";

export const TicketService = () => {
  const axios = useAxiosClient();

  // const postDataToCart = async (body) => {
  //   try {
  //     const response = await axios.get(`/cart-item`, body);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getDataFromCart = async (userId) => {
    try {
      const response = await axios.get(`/api/tickets/${userId}/false`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getDataFromCart };
};
