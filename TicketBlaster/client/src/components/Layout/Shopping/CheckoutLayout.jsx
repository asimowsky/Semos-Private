import React, { useEffect, useState } from "react";
import styles from "./CheckoutLayout.module.css";
import { GenericCard } from "../../Content/Dashboard/GenericCard";
import { formatDate } from "../../Constants/constants";
import { GenericButton } from "../../Buttons/GenericButton";
import { Navigate, useNavigate } from "react-router-dom";
import { CreditCard } from "../../CreditCard/CreditCard";

export const CheckoutLayout = ({ children, selectedCards, ...props }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Calculate the total price by iterating through selectedCards
    const newTotalPrice = selectedCards.reduce(
      (total, card) => total + card.quantity * card.event.price,
      0
    );

    // Update the state with the new total price
    setTotalPrice(newTotalPrice);
  }, [selectedCards]);

  return (
    <>
      <h1 style={{ fontWeight: "bolder" }}>{props.heading}</h1>
      <div className={styles.box}>
        <div className={styles.left}>
          <div className={styles.cardBox}>
            {selectedCards.length > 0 ? (
              selectedCards?.map((card, index) => (
                <div key={card._id} className={styles.box}>
                  <GenericCard
                    imageSrc={card?.event?.image}
                    heading={card?.event?.title}
                    subHeading={formatDate(card?.event?.date)}
                    location={card?.event?.location}
                    price={card?.event?.price}
                    piece={card?.quantity}
                    checkoutCard
                  />
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
            <hr />
            <div className={styles.spacebtwn}>
              <h2>Total: </h2>
              {/* <h2>{props.TotalPrice} </h2> */}
              <h2>${totalPrice.toFixed(2)}USD</h2>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <form>
            <div className={styles.formGroup}>
              <CreditCard />
            </div>
          </form>
        </div>
      </div>
      <div
        style={{
          marginTop: "100px",
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
          style={{
            background: "#FF48AB ",
            color: "white",
            border: "none",
            width: "130px",
          }}
          onClick={props.handlePayment}
        >
          Pay Now
        </GenericButton>
      </div>
    </>
  );
};
