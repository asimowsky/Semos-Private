import React, { useEffect } from "react";
import { LoginForm } from "../../../components/Forms/Login/LoginForm";
import { FormLayout } from "../../../components/Layout/FormPages/FormLayout";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
export const LoginPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  if (isLoggedIn) {
    return navigate("/panel/history");
  }

  return (
    <FormLayout heading="Log In">
      <LoginForm />
    </FormLayout>
  );
};
