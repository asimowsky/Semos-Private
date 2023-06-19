import React from "react";
import styles from "./InputField.module.css";

export const InputField = ({
  label,
  type,
  id,
  name,
  required,
  value,
  onChange,
  style,
  numInput,
}) => {
  return (
    <div className={styles.formGroup}>
      <div className={numInput ? "" : styles.box}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          className={numInput ? styles.numInput : styles.roundInput}
          min={1}
          max={10}
          value={value}
          onChange={onChange}
          style={style}
        />
      </div>
    </div>
  );
};
