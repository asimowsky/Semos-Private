import React, { useState, useEffect } from "react";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { EventLayout } from "../../components/Layout/EventLayout/EventLayout";
import { EventsService } from "../../services/eventsService";
import { formatDate } from "../../components/Constants/constants";
export const MusicalConcerts = () => {
  const [musicalEvents, setMusicalEvents] = useState([]);
  const [musicalCardsToShow, setMusicalCardsToShow] = useState(4);
  const { getEvents } = EventsService();
  useEffect(() => {
    const fetchMusicalEvents = async () => {
      const data = await getEvents();
      setMusicalEvents(data);
    };

    fetchMusicalEvents();
  }, []);

  const handleLoadMore = (eventType) => {
    if (eventType === "musical") {
      setMusicalCardsToShow(musicalCardsToShow + 2);
    }
  };

  return (
    <EventLayout>
      <EventBoard
        heading={"Musical Concerts"}
        loadMore={"load more musical concerts"}
        loadMoreFun={() => handleLoadMore("musical")}
        grid
      >
        {musicalEvents.slice(0, musicalCardsToShow).map((event) => (
          <GenericCard
            key={event._id}
            imageSrc={event.imageSrc}
            heading={event.title}
            subHeading={formatDate(event.date)}
            description={event.description}
            location={event.location}
          />
        ))}
      </EventBoard>
    </EventLayout>
  );
};
