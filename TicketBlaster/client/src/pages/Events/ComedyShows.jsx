import React, { useEffect, useState } from "react";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import image from "../../assets/images/comedyclub.jpeg";
import { EventLayout } from "../../components/Layout/EventLayout/EventLayout";
import { EventsService } from "../../services/eventsService";
import { formatDate } from "../../components/Constants/constants";
import { useNavigate } from "react-router-dom";
export const ComedyShows = () => {
  const [comedyCardsToShow, setComedyCardsToShow] = useState(4);
  const [comedyShows, setComedyShows] = useState([]);
  const navigate = useNavigate();
  const { getComedyEvents } = EventsService();
  const fetchMusicalEvents = async () => {
    const response = await getComedyEvents();
    setComedyShows(response);
    console.log(response);
  };
  useEffect(() => {
    fetchMusicalEvents();
  }, []);
  const handleLoadMore = (eventType) => {
    if (eventType === "comedy") {
      setComedyCardsToShow(comedyCardsToShow + 2);
    }
  };
  const navigateToSinglePage = (id) => {
    navigate(`/single/${id}`);
  };
  return (
    <EventLayout>
      <EventBoard
        heading={"Comedy Shows"}
        loadMore={"Load more musical concerts"}
        loadMoreFun={() => handleLoadMore("comedy")}
        grid
      >
        {comedyShows?.map((card, index) => (
          <GenericCard
            key={index}
            imageSrc={card.image}
            heading={card.title}
            subHeading={formatDate(card.date)}
            description={card.description}
            location={card.location}
            price={card.price}
            getTickets
            onClick={() => navigateToSinglePage(card._id)}
          />
        ))}
      </EventBoard>
    </EventLayout>
  );
};
