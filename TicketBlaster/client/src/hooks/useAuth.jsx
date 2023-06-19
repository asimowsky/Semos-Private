import { useState, useEffect } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const myToken = localStorage.getItem("accessToken");
    if (myToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
