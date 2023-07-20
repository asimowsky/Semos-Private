import React, { useState, useRef, useEffect } from "react";
import styles from "./Details.module.css";
import image from "../../../assets/images/arctic.jpg";
import { GenericButton } from "../../Buttons/GenericButton";
import { InputField } from "../Input/InputField";
export const Details = () => {
  const [forgotPass, setForgotPass] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const isForgotPassOpen = () => {
    setForgotPass((prev) => !prev);
  };

  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.userProfile}>
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="compressed" />
          )}
          <GenericButton
            onClick={() => fileInputRef.current.click()}
            style={{
              background: "transparent",
              width: "128px",
              fontWeight: "bold",
              color: "#FF48AB",
              borderColor: "black",
              height: "39px",
              fontSize: "12px",
            }}
          >
            Upload Avatar
          </GenericButton>

          <input
            type="file"
            accept="image/*"
            className={styles.btn}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>
        <div className={styles.userInputs}>
          <form action="">
            <InputField name={"fullname"} type={"text"} label={"Full Name"} />
            <InputField name={"email"} type={"text"} label={"Email"} />
          </form>
        </div>
      </div>
      <div className={styles.submit}>
        <GenericButton
          // onClick={props.loadMoreFun}
          style={{
            background: "black",
            width: "128px",
            fontWeight: "bold",
            color: "white",
            borderColor: "black",
            height: "39px",
            fontSize: "12px",
          }}
        >
          Submit
        </GenericButton>
      </div>
      <div className={styles.nextBox}>
        <p className="font-18">Password</p>

        <GenericButton
          onClick={isForgotPassOpen}
          style={{
            background: "#FF48AB",
            width: "173px",
            fontWeight: "bold",
            color: "white",
            borderColor: "none",
            borderWidth: "0px",
            outline: "none",
            height: "39px",
            fontSize: "12px",
          }}
        >
          Change Password
        </GenericButton>
      </div>
      {forgotPass && (
        <div className={styles.forgotPass}>
          <div className={styles.nextBox}>
            <InputField
              name={"password"}
              type={"password"}
              label={"Password"}
              style={{ width: "248px" }}
            />
            <InputField
              name={"password"}
              type={"password"}
              label={"Re-type Password"}
              style={{ width: "248px" }}
            />
          </div>
          <GenericButton
            // onClick={props.loadMoreFun}
            style={{
              background: "black",
              width: "128px",
              fontWeight: "bold",
              color: "white",
              borderColor: "black",
              height: "39px",
              fontSize: "12px",
            }}
          >
            Submit
          </GenericButton>
        </div>
      )}
    </div>
  );
};
