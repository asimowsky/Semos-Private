import React, { useEffect, useState } from "react";
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
  textarea,
  optionsData,
  min,
  max,
  pattern,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (optionsData) setOptions(optionsData);
    else console.warn("No options provided for select input");
  }, [optionsData]);

  return (
    <div className={styles.formGroup}>
      <div className={numInput ? "" : styles.box}>
        <label htmlFor={id}>{label}</label>
        {textarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            style={style}
            className={styles.roundInput}
          ></textarea>
        ) : type === "select" ? (
          <select
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            style={style}
            className={styles.roundInput}
          >
            <option value="">Select</option>
            {options.map((option, index) => (
              <option key={option.id || option} value={option.id || option}>
                {option.value || option}
              </option>
            ))}
          </select>
        ) : (
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
            pattern={pattern}
          />
        )}
      </div>
    </div>
  );
};
