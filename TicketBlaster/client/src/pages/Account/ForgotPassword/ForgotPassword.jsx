import React from "react";
import { ForgotPassForm } from "../../../components/Forms/ForgotPassword/ForgotPassForm";
import { FormLayout } from "../../../components/Layout/FormPages/FormLayout";
export const ForgotPassword = () => {
  return (
    <FormLayout heading="Forgot Password">
      <ForgotPassForm />
    </FormLayout>
  );
};
