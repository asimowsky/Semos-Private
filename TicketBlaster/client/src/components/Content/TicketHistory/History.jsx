import React, { useEffect, useState } from "react";
import { EventLayout } from "../../Layout/EventLayout/EventLayout";
import { EventBoard } from "../../Content/Dashboard/EventBoard";
import { GenericCard } from "../Dashboard/GenericCard";
import image from "../../../assets/images/comedyclub.jpeg";
import { ModalWrapper } from "../../Modal/ModalWrapper";
import axios from "axios";
import { formatDate } from "../../Constants/constants";
import logo from "../../../assets/images/ticketblasterblack.svg";
import styles from "./History.module.css";
import QRCode from "react-qr-code";
export const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleButtonClick(card) {
    setSelectedCard(card);
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
        {selectedCard && (
          <div className={styles.modal}>
            <img src={logo} alt="Ticket Blaster" className={styles.logo} />
            <div className="image-place">
              <img
                src={
                  process.env.REACT_APP_DATABASE_URL +
                  "uploads/" +
                  (selectedCard.event?.image || "")
                }
                alt=""
                className={styles.event_image}
              />
            </div>
            <div className={styles.ticket_place}>
              <div className={styles.info_place}>
                <h2 className={styles.title}>{selectedCard.event?.title}</h2>
                <h2 className={styles.date}>
                  {formatDate(selectedCard.event?.date)}
                </h2>
                <h2 className={styles.location}>
                  {selectedCard.event?.location}
                </h2>
              </div>
              <div className={styles.qr_place}>
                <QRCode value={selectedCard?.qrCode?.hashCode} size={155} />
              </div>
            </div>
          </div>
        )}
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
              onClickPrint={() => handleButtonClick(card)}
            />
          </div>
        ))}
      </EventBoard>
    </EventLayout>
  );
};
