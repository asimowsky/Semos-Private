import React, { useState } from "react";
import { EventLayout } from "../../Layout/EventLayout/EventLayout";
import { EventBoard } from "../../Content/Dashboard/EventBoard";
import { GenericCard } from "../Dashboard/GenericCard";
import image from "../../../assets/images/comedyclub.jpeg";
import { ModalWrapper } from "../../Modal/ModalWrapper";

export const History = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleButtonClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  const isDateExpired = (dateString) => {
    const currentDate = new Date();
    const eventDate = new Date(dateString);
    return currentDate > eventDate;
  };

  const cardsData1 = [
    {
      imageSrc: image,
      heading: "Arctic Monkeys",
      subHeading: "June 1, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quent per conubia nostra...",
      location: "Zagreb, Croatia",
    },
    {
      imageSrc: image,
      heading: "John Mayer",
      subHeading: "May 15, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quent per conubia nostra...",
      location: "Los Angeles, USA",
    },
    {
      imageSrc: image,
      heading: "The Weeknd",
      subHeading: "September 1, 2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quent per conubia nostra...",
      location: "Toronto, Canada",
    },
  ];

  return (
    <EventLayout>
      <ModalWrapper isOpen={isOpen} onClose={handleClose}>
        <h2>Modal Content </h2>
        <p>something</p>
      </ModalWrapper>

      <EventBoard grid>
        {cardsData1
          .sort((a, b) => new Date(b.subHeading) - new Date(a.subHeading))
          .map((card, index) => (
            <GenericCard
              imageSrc={card.imageSrc}
              heading={card.heading}
              subHeading={card.subHeading}
              description={card.description}
              location={card.location}
              isExpired={isDateExpired(card.subHeading)}
              printCard
              onClickPrint={handleButtonClick}
            />
          ))}
      </EventBoard>
    </EventLayout>
  );
};
