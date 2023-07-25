import React, { useContext, useEffect, useState } from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { History } from "../../components/Content/TicketHistory/History";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../store/AuthProvider";
import axios from "axios";
import { formatDate } from "../../components/Constants/constants";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";

export const EventPanel = () => {
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();
  const checkAdmin = jwtDecode(localStorage.getItem("accessToken"));
  console.log(checkAdmin.isAdmin);
  const isAdmin = checkAdmin.isAdmin;
  if (!isAdmin) {
    Navigate("/");
  }
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/events");
      setAllEvents(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEventItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/events/${id}`);
      setAllEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <PanelLayout header={"Events"} createEvent>
        <EventBoard flex>
          {allEvents?.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card.image}
              heading={card.title}
              subHeading={formatDate(card.date)}
              // description={card.description}
              location={card.location}
              price={card.price}
              onClick={() => navigate(`/panel/event/edit/${card?._id}`)}
              allEventsCard
              deleteShoppingCart
              onRemove={() => deleteEventItem(card?._id)}
            />
          ))}
        </EventBoard>
      </PanelLayout>
    </div>
  );
};
