import React from "react";
import styles from "../EventLayout/EventLayout.module.css";
export const EventLayout = ({ children }) => {
  return <div className={styles.box}>{children}</div>;
};
