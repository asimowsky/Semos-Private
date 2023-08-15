import React, { useEffect, useState } from "react";
import { ThankYouLayout } from "../../components/Layout/Shopping/ThankYouLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { GenericCard } from "../../components/Content/Dashboard/GenericCard";
import { formatDate } from "../../components/Constants/constants";
import { ModalWrapper } from "../../components/Modal/ModalWrapper";
import QRCode from "react-qr-code";
import styles from "./ThankYou.module.css";
import logo from "../../assets/images/ticketblasterblack.svg";

export const ThankYou = () => {
  const location = useLocation();
  const checkOutEvents = location.state?.checkOutEvents || [];
  console.log(checkOutEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (checkOutEvents.length === 0) {
      navigate("/");
    }
  }, []);

  function handleButtonClick(card) {
    setSelectedCard(card); // Save the selected card data to display in the modal
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div>
      <ModalWrapper isOpen={isOpen} onClose={handleClose}>
        {selectedCard && (
          <div className={styles.modal}>
            <img src={logo} alt="Ticket Blaster" className={styles.logo} />
            <div className="image-place">
              <img
                src={
                  process.env.REACT_APP_DATABASE_URL +
                  "uploads/" +
                  selectedCard.event.image
                }
                alt=""
                className={styles.event_image}
              />
            </div>
            <div className={styles.ticket_place}>
              <div className={styles.info_place}>
                <h2 className={styles.title}>{selectedCard.event.title}</h2>
                <h2 className={styles.date}>
                  {formatDate(selectedCard.event.date)}
                </h2>
                <h2 className={styles.location}>
                  {selectedCard.event.location}
                </h2>
              </div>
              <div className={styles.qr_place}>
                {selectedCard?.event?.title ? (
                  <QRCode value={selectedCard?.event?.title} size={155} />
                ) : (
                  <p>No QR Code available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </ModalWrapper>
      <ThankYouLayout heading="Thank you for your purchase!">
        {checkOutEvents.map((card, index) => (
          <GenericCard
            key={index}
            imageSrc={card?.event?.image}
            heading={card?.event?.title}
            subHeading={formatDate(card?.event?.date)}
            editCardLink={true}
            location={card?.event?.location}
            price={card?.event?.price}
            piece={card?.quantity}
            shoppingCard
            printShoppingCart
            horizontalLine
            onClickPrint={() => handleButtonClick(card)}
          />
        ))}
      </ThankYouLayout>
    </div>
  );
};
