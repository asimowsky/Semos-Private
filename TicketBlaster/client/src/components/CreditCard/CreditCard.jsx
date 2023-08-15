import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styles from "./CreditCard.module.css";
import { GenericButton } from "../Buttons/GenericButton";
import { InputField } from "../Forms/Input/InputField";

export const CreditCard = () => {
  const [focus, setFocus] = useState("");

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFormData()) {
      console.log("payment successfully done");
      // Add your payment processing logic here.
    }
  };

  const validateFormData = () => {
    const { number, name, date, cvc } = formData;
    const cardNumberPattern = /^\d{1,16}$/;
    const cvcPattern = /^\d{1,3}$/;
    const datePattern = /^\d{1,2}$/;

    if (!cardNumberPattern.test(number)) {
      setErrorMessage("Invalid credit card number");
      return false;
    }

    if (name.trim().length === 0) {
      setErrorMessage("Full name is required");
      return false;
    }

    if (!datePattern.test(date)) {
      setErrorMessage("Invalid date");
      return false;
    }

    if (!cvcPattern.test(cvc)) {
      setErrorMessage("Invalid CVC");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <Cards
          number={formData.number}
          name={formData.name}
          expiry={formData.month + formData.year}
          cvc={formData.cvc}
          focused={focus}
        />
        <form onSubmit={handleSubmit}>
          <div className={styles.box}>
            <div className={styles.formGroup}>
              <div className={styles.box}>
                {/* Credit Card Number */}
                <label htmlFor="creditCardNumber">Credit Card Number</label>
                <input
                  id="creditCardNumber"
                  name="number"
                  type="tel"
                  maxLength="16"
                  value={formData.number}
                  onChange={handleInputChange}
                  onFocus={() => setFocus("number")}
                />

                {/* Full Name */}
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  maxLength="20"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocus("name")}
                />

                {/* Expiry Date */}
                <label htmlFor="expiryMonth">Expiry Date</label>
                <div className={styles.expiryContainer}>
                  <input
                    id="expiryMonth"
                    name="month"
                    type="tel"
                    maxLength="2"
                    placeholder="MM"
                    value={formData.month}
                    onChange={handleInputChange}
                    onFocus={() => setFocus("expiry")}
                  />
                  <span className={styles.expirySeparator}>/</span>
                  <input
                    id="expiryYear"
                    name="year"
                    type="tel"
                    maxLength="2"
                    placeholder="YY"
                    value={formData.year}
                    onChange={handleInputChange}
                    onFocus={() => setFocus("expiry")}
                  />
                </div>

                {/* CVC */}
                <label htmlFor="cvc">CVC</label>
                <input
                  id="cvc"
                  name="cvc"
                  type="tel"
                  maxLength="3"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  onFocus={() => setFocus("cvc")}
                />

                {errorMessage && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
