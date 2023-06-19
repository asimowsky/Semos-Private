import React from "react";
import styles from "./GenericButton.module.css";
export const GenericButton = ({ children, style, onClick, className }) => {
  return (
    <button
      style={style}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
