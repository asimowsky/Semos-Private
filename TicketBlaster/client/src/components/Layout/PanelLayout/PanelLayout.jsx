import React, { useContext, useEffect } from "react";
import styles from "./PanelLayout.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../store/AuthProvider";
import { GenericButton } from "../../Buttons/GenericButton";
import jwtDecode from "jwt-decode";

export const PanelLayout = ({ children, ...props }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();

  const isLinkActive = (to) => {
    return location.pathname === to;
  };

  if (!isLoggedIn) {
    return navigate("/");
  }
  const checkAdmin = jwtDecode(localStorage.getItem("accessToken"));
  // console.log(checkAdmin.isAdmin);
  const isAdmin = checkAdmin.isAdmin;
  return (
    <div className={styles.box}>
      <div className={styles.headerBar}>
        <h1 className={`${styles.smallPanel} font-large`}>
          {props.header}
          {props.createEvent && isAdmin && (
            <Link to={`/panel/event/details`}>
              <GenericButton className={styles.btn}>Create Event</GenericButton>
            </Link>
          )}
        </h1>

        <div className={styles.links}>
          {isAdmin && (
            <Link
              to="/panel/events"
              className={isLinkActive("/panel/events") ? styles.linkColor : ""}
            >
              <h3 className="font-18">Events</h3>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/panel/users"
              className={isLinkActive("/panel/users") ? styles.linkColor : ""}
            >
              <h3 className="font-18">Users</h3>
            </Link>
          )}
          <Link
            to="/panel/history"
            className={isLinkActive("/panel/history") ? styles.linkColor : ""}
          >
            <h3 className="font-18">Tickets History</h3>
          </Link>
          <Link
            to="/panel/details"
            className={isLinkActive("/panel/details") ? styles.linkColor : ""}
          >
            <h3 className="font-18">User Details </h3>
          </Link>
          <button
            onClick={logout}
            style={{
              background: "transparent",
              border: 0,
              cursor: "pointer",
            }}
          >
            <h3 className="font-18">Log Out</h3>
          </button>
        </div>
      </div>
      <div className={styles.panel}>{children}</div>
    </div>
  );
};
