import React, { useState } from "react";
import styles from "./ShoppingLayout.module.css";
import { GenericCard } from "../../Content/Dashboard/GenericCard";
import { formatDate } from "../../Constants/constants";
import { GenericButton } from "../../Buttons/GenericButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShoppingLayout = ({
  children,
  selectedCards,
  shoppingCartItems,
  ...props
}) => {
  const navigate = useNavigate();
  const navigateToSinglePage = (id) => {
    navigate(`/single/${id}`);
  };

  const hasSelectedCards = selectedCards && selectedCards.length > 0;
  const hasShoppingCartItems =
    shoppingCartItems && shoppingCartItems.length > 0;

  return (
    <div className={styles.box}>
      <h1 style={{ fontWeight: "bolder" }}>{props.heading}</h1>
      <div className={styles.giant_box}>
        <div className={styles.upperBox}>
          <div>
            {hasSelectedCards &&
              selectedCards.map((card, index) => (
                <div key={card._id} className={styles.box}>
                  <GenericCard
                    imageSrc={card.image}
                    mimeType={card.imageMIMEType}
                    heading={card.title}
                    subHeading={formatDate(card.date)}
                    location={card.location}
                    price={card.price}
                    shoppingCard={props.showShoppingCard}
                    searchButton={props.searchButton}
                    onClick={() => navigateToSinglePage(card._id)}
                    getTickets={props.callGetTickets}
                  />
                  <hr />
                </div>
              ))}

            {hasShoppingCartItems &&
              shoppingCartItems.map((card, index) => (
                <div key={card._id} className={styles.box}>
                  <GenericCard
                    imageSrc={card?.event?.image}
                    mimeType={card.imageMIMEType}
                    heading={card?.event?.title}
                    subHeading={formatDate(card?.event?.date)}
                    location={card?.event?.location}
                    price={card?.event?.price}
                    shoppingCard={props.showShoppingCard}
                    searchButton={props.searchButton}
                    onClick={() => navigateToSinglePage(card._id)}
                    getTickets={props.callGetTickets}
                    piece={card?.quantity}
                    removeShoppingCart
                    // onRemove={() => props.handleRemoveShoppingCart(card._id)}
                    onRemove={props.handleRemoveShoppingCart.bind(
                      this,
                      card._id
                    )}
                  />
                  <hr />
                </div>
              ))}

            {!hasSelectedCards && !hasShoppingCartItems && (
              <p>{props.searchLayout ? "No data found" : "No items in cart"}</p>
            )}
          </div>
        </div>

        <div className={styles.bottomBox}>
          {props.checkoutButtons && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <GenericButton
                style={{
                  background: "black ",
                  color: "white",
                  border: "none",
                  width: "130px",
                }}
                onClick={() => navigate(-1)}
              >
                Back
              </GenericButton>
              <GenericButton
                onClick={() => navigate("/shopping/checkout")}
                style={{
                  background: "#FF48AB ",
                  color: "white",
                  border: "none",
                  width: "130px",
                }}
              >
                Check Out
              </GenericButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
