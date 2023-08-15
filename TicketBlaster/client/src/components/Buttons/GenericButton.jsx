import React from "react";
import styles from "./GenericButton.module.css";
export const GenericButton = ({
  children,
  style,
  type,
  onClick,
  className,
}) => {
  return (
    <button
      style={style}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
