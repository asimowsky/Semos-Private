import React, { useState, useEffect } from "react";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { EventLayout } from "../../components/Layout/EventLayout/EventLayout";
import { EventsService } from "../../services/eventsService";
import { formatDate } from "../../components/Constants/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MusicalConcerts = () => {
  const [musicalEvents, setMusicalEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const navigate = useNavigate();

  const fetchMusicalEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/events/type?type=Music&page=${
          page + 1
        }&limit=${2}`
      );

      setMusicalEvents((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMusicalEvents();
  }, []);

  const navigateToSinglePage = (id) => {
    navigate(`/single/${id}`);
  };

  const handleLoadMore = (eventType) => {
    if (eventType === "musical") {
      fetchMusicalEvents();
    }
  };

  return (
    <EventLayout>
      <EventBoard
        heading={"Musical Concerts"}
        loadMore={stopLoadMore ? false : "load more musical concerts"}
        loadMoreFun={() => handleLoadMore("musical")}
        grid
      >
        {musicalEvents?.map((card, index) => (
          <GenericCard
            key={index}
            imageSrc={card?.image}
            heading={card?.title}
            subHeading={formatDate(card?.date)}
            description={card?.description}
            location={card?.location}
            price={card?.price}
            getTickets
            onClick={() => navigateToSinglePage(card?._id)}
          />
        ))}
      </EventBoard>
    </EventLayout>
  );
};
