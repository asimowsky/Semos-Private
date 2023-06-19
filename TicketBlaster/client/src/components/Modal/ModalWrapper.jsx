import React from "react";
import ReactDOM from "react-dom";
import styles from "./ModalWrapper.module.css";
export const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.modalOnClose} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
};
