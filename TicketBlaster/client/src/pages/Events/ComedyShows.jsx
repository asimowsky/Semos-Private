import React, { useState } from "react";
import { EventBoard } from "../../components/Content/Dashboard/EventBoard";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import image from "../../assets/images/comedyclub.jpeg";
import { EventLayout } from "../../components/Layout/EventLayout/EventLayout";
export const ComedyShows = () => {
  const cardsData1 = [
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 9th, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra Lorem ipsum dolor sit amet, consectetur adipiscing elit. quent per conubia nostra",
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

  const [comedyCardsToShow, setComedyCardsToShow] = useState(4);

  const handleLoadMore = (eventType) => {
    if (eventType === "comedy") {
      setComedyCardsToShow(comedyCardsToShow + 2);
    }
  };
  return (
    <EventLayout>
      <EventBoard
        heading={"Comedy Shows"}
        loadMore={"Load more musical concerts"}
        loadMoreFun={() => handleLoadMore("comedy")}
        grid
      >
        {cardsData1.slice(0, comedyCardsToShow).map((card, index) => (
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
    </EventLayout>
  );
};
