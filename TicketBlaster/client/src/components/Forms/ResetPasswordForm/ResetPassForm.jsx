import React from "react";
import styles from "./ResetPassForm.module.css";
import { InputField } from "../Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
export const ResetPassForm = () => {
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.box}>
          <div className="upper">
            <InputField
              label="Password"
              type="password"
              id="password"
              name="password"
              required
            />
            <InputField
              label="Re-type Password"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
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
