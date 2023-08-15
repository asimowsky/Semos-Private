import React, { useState } from "react";
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
      <div>{children}</div>
    </div>
  );
};
