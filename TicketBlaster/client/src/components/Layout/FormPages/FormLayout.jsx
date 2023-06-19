import React from "react";
import styles from "./FormLayout.module.css";
export const FormLayout = ({ children, ...props }) => {
  return (
    <div className={styles.section}>
      <div className={styles.box}>
        <p className={styles.heading}>{props.heading}</p>
        {children}
      </div>
    </div>
  );
};
