import React from "react";
import { CreateAccountForm } from "../../../components/Forms/CreateAccount/CreateAccountForm";
import { FormLayout } from "../../../components/Layout/FormPages/FormLayout";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export const CreateAccount = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  if (isLoggedIn) {
    navigate("/panel/history");
  }
  return (
    <FormLayout heading="Create Account">
      <CreateAccountForm />
    </FormLayout>
  );
};
