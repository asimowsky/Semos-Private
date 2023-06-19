import React, { useEffect } from "react";
import { PanelLayout } from "../../components/Layout/PanelLayout/PanelLayout";
import { Details } from "../../components/Forms/UserDetails/Details";
import { useNavigate } from "react-router-dom";
export const UserDetails = () => {
  return (
    <div>
      <PanelLayout header={"User Details"}>
        <Details />
      </PanelLayout>
    </div>
  );
};
