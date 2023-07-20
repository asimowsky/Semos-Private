import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/authService";
import { GenericButton } from "../../Buttons/GenericButton";
import { InputField } from "../Input/InputField";
import styles from "./LoginForm.module.css";
import { AuthContext } from "../../../store/AuthProvider";
export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;
  const { loginAuth } = AuthService();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginAuth(formFields);
    if (response && response.token) {
      console.log(response.message);
      login(response.token);
      navigate("/panel/history");
    } else {
      console.log(response?.data?.error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin}>
        <div className={styles.bigBox}>
          <div className={styles.box}>
            <InputField
              label="Email"
              type="text"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.downSide}>
            <div className={styles.downFormSide}>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
              <GenericButton className={styles.btnLogin} type="submit">
                Log in
              </GenericButton>
            </div>
            <GenericButton className={styles.btnDha}>
              Don't have an account?
            </GenericButton>
          </div>
        </div>
      </form>
    </div>
  );
};
