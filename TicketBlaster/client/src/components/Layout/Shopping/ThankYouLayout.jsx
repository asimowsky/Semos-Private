import React, { useState } from "react";
import { formatDate } from "../../Constants/constants";
import { GenericCard } from "../../Content/Dashboard/GenericCard";
import styles from "./ThankYouLayout.module.css";
import { ModalWrapper } from "../../Modal/ModalWrapper";

export const ThankYouLayout = ({ children, selectedCards, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleButtonClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <div className={styles.box}>
      <h1 style={{ fontWeight: "bolder" }}>{props.heading}</h1>
      <ModalWrapper isOpen={isOpen} onClose={handleClose}>
        <h2>Modal Content </h2>
        <p>something</p>
      </ModalWrapper>
      <div>
        {selectedCards.length > 0 &&
          selectedCards?.map((card, index) => (
            <div key={card._id} className={styles.box}>
              <GenericCard
                imageSrc={card.image}
                heading={card.title}
                subHeading={formatDate(card.date)}
                location={card.location}
                price={card.price}
                shoppingCard
                searchButton={props.searchButton}
                printShoppingCart
                onClickPrint={handleButtonClick}
              />
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};
