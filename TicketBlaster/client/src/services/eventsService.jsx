import { useAxiosClient } from "./axiosConfig";

export const EventsService = () => {
  const axios = useAxiosClient();

  const getEvents = async () => {
    try {
      const response = await axios.get("/api/musical/events");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (body) => {
    try {
      const response = await axios.post("/api/musical/events", body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
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
    getEvents,
    createEvent,
    deleteEvent,
  };
};
