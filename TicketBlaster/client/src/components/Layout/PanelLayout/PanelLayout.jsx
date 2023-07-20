import React, { useContext, useEffect } from "react";
import styles from "./PanelLayout.module.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { AuthContext } from "../../../store/AuthProvider";
import { GenericButton } from "../../Buttons/GenericButton";

export const PanelLayout = ({ children, ...props }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  if (!isLoggedIn) {
    return navigate("/");
  }

  return (
    <div className={styles.box}>
      <div className={styles.headerBar}>
        <h1 className={`${styles.smallPanel} font-large`}>
          {props.header}
          {props.createEvent && (
            <Link to={`/panel/event/details`}>
              <GenericButton className={styles.btn}>Create Event</GenericButton>
            </Link>
          )}
        </h1>

        <div className={styles.links}>
          <Link to="/panel/events">
            <h3 className="font-18">Events</h3>
          </Link>
          <Link to="/panel/users">
            <h3 className="font-18">Users</h3>
          </Link>
          <Link to="/panel/history">
            <h3 className="font-18">Tickets History</h3>
          </Link>
          <Link to="/panel/details">
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
