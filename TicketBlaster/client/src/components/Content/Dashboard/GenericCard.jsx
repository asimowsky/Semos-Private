import React from "react";
import styles from "./GenericCard.module.css";
import { GenericButton } from "../../Buttons/GenericButton";
export const GenericCard = ({
  imageSrc,
  heading,
  subHeading,
  description,
  location,
  isExpired,
  printCard,
  onClickPrint,
}) => {
  return (
    <div className={isExpired ? styles.expiredCard : styles.cardWrapper}>
      <div className={styles.cardImage}>
        <img src={imageSrc} alt="card" className="img" />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.heading}>{heading}</h2>
        <h3 className={styles.subHeading} style={{ color: "#FF48AB" }}>
          {subHeading}
        </h3>
        <p
          className={styles.description}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <div className={styles.bottomBox}>
          <div className={styles.bottomLeftText}>
            <p>{location}</p>
          </div>
          <div className={styles.buttonWrapper}>
            {printCard ? (
              <GenericButton
                onClick={onClickPrint}
                style={{
                  background: "black",
                  width: "128px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Print
              </GenericButton>
            ) : (
              <GenericButton
                style={{
                  background: "black",
                  width: "128px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Get Tickets
              </GenericButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
