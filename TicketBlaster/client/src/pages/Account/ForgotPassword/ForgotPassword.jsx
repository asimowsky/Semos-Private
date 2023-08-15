import React from "react";
import { ForgotPassForm } from "../../../components/Forms/ForgotPassword/ForgotPassForm";
import { FormLayout } from "../../../components/Layout/FormPages/FormLayout";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  if (isLoggedIn) {
    navigate("/panel/history");
  }
  return (
    <FormLayout heading="Forgot Password">
      <ForgotPassForm />
    </FormLayout>
  );
};
