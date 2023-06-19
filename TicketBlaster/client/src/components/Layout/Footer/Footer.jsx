import React from "react";
import styles from "./Footer.module.css";
import logo from "../../../assets/images/logo.svg";
export const Footer = () => {
  return (
    <footer>
      <div className={styles.box}>
        <div className={styles.left}>
          <ul>
            <li>
              <img src={logo} className={styles.logo} alt="" />
            </li>
          </ul>
          <div className="box">Musical Concerts</div>
          <div className="box">Stand-up Comedy</div>
        </div>
        <div className="right">Copyright © Creative Core 2023</div>
      </div>
    </footer>
  );
};
