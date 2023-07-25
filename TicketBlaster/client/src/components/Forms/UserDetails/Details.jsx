import React, { useState, useRef, useEffect } from "react";
import styles from "./Details.module.css";
import image from "../../../assets/images/arctic.jpg";
import { GenericButton } from "../../Buttons/GenericButton";
import { InputField } from "../Input/InputField";
import { toast } from "react-hot-toast";
import axios from "axios";
export const Details = () => {
  const [forgotPass, setForgotPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userImage, setUserImage] = useState("");
  const USER_ID = localStorage.getItem("userID");
  const fileInputRef = useRef();
  const isForgotPassOpen = () => {
    setForgotPass((prev) => !prev);
  };

  const convertToBase64 = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setUserFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await axios.get(
          `http://localhost:8085/api/users/${USER_ID}`
        );
        setUserEmail(userDetails?.data?.email);
        setUserFullName(userDetails?.data?.fullName);
        setUserImage(userDetails?.data?.image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
  }, [USER_ID]);

  const postNewUserDetails = async (e) => {
    e.preventDefault();
    let fullName = userFullName;
    let email = userEmail;
    let image = selectedFile;
    try {
      const response = await axios.put(
        `http://localhost:8085/api/users/${USER_ID}`,
        { image, email, fullName }
      );
      console.log("Data successfully updated:", response.data);
      toast.success("Data successfully updated!!!");
    } catch (error) {
      toast.error("Some Error Happened Please Try Again Dude !");
    }
  };

  const postNewPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8085/api/users/${USER_ID}`,
        { password }
      );

      setPassword("");
      setConfirmPassword("");

      toast.success("Password updated:", response?.data);
    } catch (error) {
      toast.error("Error changing password. Please try again.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.userProfile}>
          {selectedFile ? (
            <img src={selectedFile || ""} alt="compressed" />
          ) : (
            <img src={userImage} alt="compressed" />
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
            onChange={convertToBase64}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>
        <div className={styles.userInputs}>
          <form action="">
            <InputField
              name={"fullName"}
              type={"text"}
              label={"Full Name"}
              value={userFullName}
              onChange={(e) => handleFullNameChange(e)}
              required={true}
            />
            <InputField
              name={"email"}
              type={"text"}
              label={"Email"}
              value={userEmail}
              onChange={(e) => handleEmailChange(e)}
              required={true}
            />
          </form>
        </div>
      </div>
      <div className={styles.submit}>
        <GenericButton
          onClick={(e) => postNewUserDetails(e)}
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
              value={password}
              onChange={handlePasswordChange}
            />
            <InputField
              name={"confirmPassword"}
              type={"password"}
              label={"Re-type Password"}
              style={{ width: "248px" }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <GenericButton
            onClick={postNewPassword}
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
