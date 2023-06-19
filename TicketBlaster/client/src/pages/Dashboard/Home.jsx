import React, { useState } from "react";
import image from "../../assets/images/arctic.jpg";
import mrbean from "../../assets/images/mrbean.jfif";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { HeroCard } from "../../components/Content/Dashboard/HeroCard";
import { ModalWrapper } from "../../components/Modal/ModalWrapper";

export const Home = () => {
  const cardsData1 = [
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },

    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
  ];
  const cardsData2 = [
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: mrbean,
      heading: "MisterBean",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra…",
      location: "Zagreb, Croatia",
    },
  ];

  return (
    <div>
      <HeroCard />
      {/* TODO ADD LINK */}
      <div className="board">
        <EventBoard
          heading={"Musical Concerts"}
          loadMore={"See all musical concerts"}
        >
          {cardsData1.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card.imageSrc}
              heading={card.heading}
              subHeading={card.subHeading}
              description={card.description}
              location={card.location}
            />
          ))}
        </EventBoard>
        <EventBoard
          heading={"Stand-up Comedy"}
          loadMore={"See all comedy shows"}
        >
          {cardsData2.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card.imageSrc}
              heading={card.heading}
              subHeading={card.subHeading}
              description={card.description}
              location={card.location}
            />
          ))}
        </EventBoard>
      </div>
    </div>
  );
};
