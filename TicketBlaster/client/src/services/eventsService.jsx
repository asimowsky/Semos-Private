import { toast } from "react-hot-toast";
import { useAxiosClient } from "./axiosConfig";

export const EventsService = () => {
  const axios = useAxiosClient();

  const getMusicalEvents = async () => {
    try {
      const response = await axios.get(`/api/events/type?type=Music`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getComedyEvents = async () => {
    try {
      const response = await axios.get(`/api/events/type?type=Comedy`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllEvents = async () => {
    try {
      const response = await axios.get(`/api/events`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getEventByParams = async (type) => {
    try {
      const response = await axios.get(`/api/events?type=${type}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (body) => {
    try {
      const response = await axios.post("/api/events", body);
      toast.success(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await axios.post(`/api/musical/events/${id}/delete`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllEvents,
    getComedyEvents,
    getMusicalEvents,
    createEvent,
    deleteEvent,
    getEventByParams,
  };
};
