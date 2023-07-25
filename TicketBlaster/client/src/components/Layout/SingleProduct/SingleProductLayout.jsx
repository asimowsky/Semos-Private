import React, { useState } from "react";
import styles from "./SingleProductLayout.module.css";
import { InputField } from "../../Forms/Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
import image from "../../../assets/images/comedyclub.jpeg";
import { GenericCard } from "../../Content/Dashboard/GenericCard";
import { EventBoard } from "../../Content/Dashboard/EventBoard";
import { formatDate } from "../../Constants/constants";
export const SingleProductLayout = ({
  header,
  date,
  description,
  imgSrc,
  price,
  children,
  longDesc,
  relatedEvents,
  ...props
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <p className={styles.header}>{header}</p>
        <p className={styles.description}>{date}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.product}>
        <div className={styles.productLeft}>
          <img src={imgSrc} />
        </div>
        <div className={styles.productRight}>
          <div className={styles.about}>About</div>
          <div className={styles.descriptionSmall}>
            <div className="descOne">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              blandit vulputate posuere. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Aliquam orci
              nunc, dapibus non orci sed, suscipit sodales erat.
            </div>
            <div className="descTwo">{longDesc}</div>
            <div className="bottomBox">
              <div className={styles.ticketBox}>
                <div className={styles.tickets}>
                  <h1>Tickets:</h1>
                  <h1>{price}</h1>
                </div>
              </div>
              <div className={styles.cartBtnBox}>
                <InputField
                  type="number"
                  id="number"
                  name="quantity"
                  required
                  numInput
                  value={props.quantity}
                  onChange={props.onChange}
                />
                <GenericButton
                  onClick={props.addToCart}
                  style={{
                    background: "black",
                    width: "128px",
                    borderWidth: "0px",
                    color: "white",
                    height: "33px",
                    fontSize: "14px",
                  }}
                >
                  Add to cart
                </GenericButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TODO RELATED ACTS PROPS.MAP FOR CONNECTING DATA WITH BACKEND FROM THE PAGE SIDE! */}
      <div className={styles.relatedActs}>
        <EventBoard heading={"Related Acts"} grid>
          {relatedEvents?.map((card, index) => (
            <GenericCard
              key={index}
              imageSrc={card?.image}
              heading={card?.title}
              subHeading={formatDate(card?.date)}
              description={card?.description}
              location={card?.location}
              price={card?.price}
              getTickets
            />
          ))}
        </EventBoard>
      </div>
    </div>
  );
};
