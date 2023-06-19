import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css";
import { GenericButton } from "../../Buttons/GenericButton";
import { InputField } from "../Input/InputField";
import { AuthService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createAccount } = AuthService();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const response = await createAccount(formData);

    if (response) {
      navigate("/login");
    } else {
      console.log(response?.error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <div className={styles.formGroup}>
            <div className={styles.box}>
              <InputField
                label="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <InputField
                label="Re-type Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </div>
          </div>

          <div className={styles.downSide}>
            <div className={styles.downFormSide}>
              <GenericButton
                type="submit"
                style={{
                  backgroundColor: "#FF48AB",
                  border: "none",
                  width: "357px",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "16px",
                  height: "44px",
                }}
              >
                Create Account
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
              Already have an account?
            </GenericButton>
          </div>
        </div>
      </form>
    </div>
  );
};
