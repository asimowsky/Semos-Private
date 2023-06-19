import React from "react";
import styles from "./EventBoard.module.css";
import { GenericButton } from "../../Buttons/GenericButton";
export const EventBoard = ({ children, flex, grid, ...props }) => {
  const displayStyle = grid ? styles.grid : styles.flex;
  return (
    <div className={styles.eventBoard}>
      <div className={styles.heading}>{props.heading}</div>
      {grid ? (
        <div className={styles.grid}>{children}</div>
      ) : (
        <div className={styles.box}>{children}</div>
      )}
      {props.loadMore && (
        <GenericButton
          onClick={props.loadMoreFun}
          style={{
            background: "transparent",
            width: "100%",
            fontWeight: "bold",
            color: "black",
            height: "40px",
            fontSize: "18px",
          }}
        >
          {props.loadMore}
        </GenericButton>
      )}
    </div>
  );
};
