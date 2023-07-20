import React, { useEffect, useState } from "react";
import { EventLayout } from "../../Layout/EventLayout/EventLayout";
import { EventBoard } from "../../Content/Dashboard/EventBoard";
import { GenericCard } from "../Dashboard/GenericCard";
import image from "../../../assets/images/comedyclub.jpeg";
import { ModalWrapper } from "../../Modal/ModalWrapper";
import axios from "axios";
import { formatDate } from "../../Constants/constants";

export const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  function handleButtonClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  const isDateExpired = (dateString) => {
    const currentDate = new Date();
    const eventDate = new Date(dateString);
    return eventDate > currentDate;
  };
  const USER_ID = localStorage.getItem("userID");

  useEffect(() => {
    const getPurchasedTickets = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/tickets/${userId}/true`
        );
        setPurchasedTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPurchasedTickets(USER_ID);
  }, []);

  return (
    <EventLayout>
      <ModalWrapper isOpen={isOpen} onClose={handleClose}>
        <h2>Modal Content </h2>
        <p>something</p>
      </ModalWrapper>

      <EventBoard grid>
        {purchasedTickets.map((card, index) => (
          <div className="cart" key={card?._id}>
            <GenericCard
              imageSrc={card?.event?.image}
              heading={card?.event?.title}
              subHeading={formatDate(card?.event?.date)}
              description={card?.event?.description}
              location={card?.event?.location}
              isExpired={isDateExpired(card?.event?.date)}
              printCard
              onClickPrint={handleButtonClick}
            />
          </div>
        ))}
      </EventBoard>
    </EventLayout>
  );
};
