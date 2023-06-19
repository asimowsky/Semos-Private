import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { Footer } from "../Footer/Footer";
export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
