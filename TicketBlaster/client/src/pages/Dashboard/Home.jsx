import React, { useEffect, useState } from "react";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { HeroCard } from "../../components/Content/Dashboard/HeroCard";
import { EventsService } from "../../services/eventsService";

export const Home = () => {
  const [musicalConcerts, setMusicalConcerts] = useState();
  const [comedyShows, setComedyShows] = useState();
  const { getEventByParams } = EventsService();
  useEffect(() => {
    const musicalRes = async () => {
      const data = await getEventByParams("Music");
      setMusicalConcerts(data);
    };

    const comedyRes = async () => {
      const data = await getEventByParams("Comedy");
      setComedyShows(data);
    };

    musicalRes();
    comedyRes();
  }, []);
  return (
    <div>
      <HeroCard />
      {/* TODO ADD LINK */}
      <div className="board">
        <EventBoard
          heading={"Musical Concerts"}
          loadMore={"See all musical concerts"}
        >
          {musicalConcerts?.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card?.image}
              heading={card.heading}
              subHeading={card.subHeading}
              description={card.description}
              location={card.location}
              getTickets
            />
          ))}
        </EventBoard>
        <EventBoard
          heading={"Stand-up Comedy"}
          loadMore={"See all comedy shows"}
        >
          {comedyShows?.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card?.image}
              heading={card?.heading}
              subHeading={card?.subHeading}
              description={card?.description}
              location={card?.location}
              getTickets
            />
          ))}
        </EventBoard>
      </div>
    </div>
  );
};
