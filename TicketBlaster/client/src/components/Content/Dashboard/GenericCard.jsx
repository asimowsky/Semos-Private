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
  showRemove,
  onClick,
  imageMIMEType,
  id,
  onRemove,
  shoppingCard,
  price,
  piece,
  getTickets,
  mimeType,
  checkoutCard,
  ...props
}) => {
  return (
    <div
      className={
        isExpired
          ? styles.expiredCard
          : shoppingCard
          ? styles.shoppingCard
          : styles.cardWrapper
      }
    >
      <div className={styles.left}>
        <div className={styles.cardImage}>
          {mimeType ? (
            <img
              src={`data:${imageMIMEType};base64,${imageSrc}`}
              alt="card"
              className="img"
            />
          ) : (
            <img
              src={` ${
                process.env.REACT_APP_DATABASE_URL + "uploads/" + imageSrc
              }`}
              alt="card"
              className="img"
            />
          )}
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
                <>
                  {showRemove && (
                    <GenericButton
                      onClick={onRemove}
                      style={{
                        background: "black",
                        width: "128px",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Remove
                    </GenericButton>
                  )}
                  {!showRemove && getTickets && (
                    <GenericButton
                      onClick={onClick}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {shoppingCard && (
          <>
            <div className={styles.cartPlace}>
              <p
                style={{
                  fontWeight: "bolder",
                  fontSize: "18px",
                  textAlign: "right",
                }}
              >
                {" "}
                ${(piece * price).toFixed(2)}
              </p>
              <p
                style={{
                  fontWeight: "light",
                  fontSize: "12px",
                  textAlign: "right",
                  color: "#FF48AB",
                }}
              >
                {" "}
                {piece} x ${price.toFixed(2)}
              </p>

              {props.searchButton && (
                <GenericButton
                  // onClick={onRemove}
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
              {props.removeShoppingCart && (
                <GenericButton
                  onClick={onRemove}
                  style={{
                    background: "black",
                    width: "128px",
                    fontWeight: "bold",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Remove
                </GenericButton>
              )}
              {props.printShoppingCart && (
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
              )}
            </div>
          </>
        )}
        {checkoutCard && (
          <>
            <div className={styles.cartPlace}>
              <p style={{ fontWeight: "bolder", fontSize: "18px" }}>
                {" "}
                ${(piece * price).toFixed(2)}
              </p>
              <p style={{ fontWeight: "bolder", fontSize: "14px" }}>
                {piece} x ${price.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
