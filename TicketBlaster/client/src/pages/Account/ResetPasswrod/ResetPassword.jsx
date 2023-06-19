import React from "react";
import { FormLayout } from "../../../components/Layout/FormPages/FormLayout";
import { ResetPassForm } from "../../../components/Forms/ResetPasswordForm/ResetPassForm";

export const ResetPassword = () => {
  return (
    <FormLayout heading="Reset Password">
      <ResetPassForm />
    </FormLayout>
  );
};
