import React, { useContext, useEffect } from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { History } from "../../components/Content/TicketHistory/History";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../store/AuthProvider";

export const TicketHistory = () => {
  // const checkAdmin = jwtDecode(localStorage.getItem("accessToken"));
  // console.log(checkAdmin.isAdmin);
  // const isAdmin = checkAdmin.isAdmin;

  const { isLoggedIn, logout } = useContext(AuthContext);
  if (!isLoggedIn) {
    Navigate("/");
  }
  return (
    <div>
      <PanelLayout header={"Ticket History"}>
        {/* {!isAdmin && "HELLO ADMIN"} */}
        <History />
      </PanelLayout>
    </div>
  );
};
