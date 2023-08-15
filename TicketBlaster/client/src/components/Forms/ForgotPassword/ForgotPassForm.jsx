import React, { useState } from "react";
import styles from "./ForgotPassForm.module.css";
import { InputField } from "../Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const ForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(" http://localhost:8085/api/auth/forgot-password", {
        email,
      });
      toast.success(
        "Email sent! Tap the link in that email to reset your password."
      );
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        toast.error("Couldn't post data to backend");
      } else if (err.response.status === 404) {
        toast.error(err.response.data);
      } else {
        toast.error("Error happened");
      }
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <InputField
            label="Email"
            type="text"
            id="email"
            name="email"
            required
            onChange={handleEmailChange}
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
                type={"form"}
              >
                Send reset token
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
              onClick={() => navigate("/login")}
            >
              Back to login
            </GenericButton>
          </div>
        </div>
      </form>
    </div>
  );
};
