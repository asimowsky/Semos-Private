import React from "react";
import styles from "./SearchBox.module.css";
export const SearchBox = (props) => {
    return <input className={styles.search} placeholder={props.placeholder} />;
};
