import React from "react";
import styles from "./ForgotPassForm.module.css";
import { InputField } from "../Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
export const ForgotPassForm = () => {
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.box}>
          <InputField
            label="Email"
            type="text"
            id="email"
            name="email"
            required
          />
          <div className={styles.downSide}>
            <div className={styles.downFormSide}>
              <GenericButton
                style={{
                  backgroundColor: "#FF48AB",
                  border: "none",
                  width: "100%",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "16px",
                  height: "42px",
                }}
              >
                Log in
              </GenericButton>
            </div>
            <GenericButton
              style={{
                backgroundColor: "transparent",
                border: "1px solid #FF48AB",
                width: "100%",
                fontWeight: "bold",
                color: "black",
                fontSize: "16px",
                height: "42px",
              }}
            >
              Back to login
            </GenericButton>
          </div>
        </div>
      </form>
    </div>
  );
};
