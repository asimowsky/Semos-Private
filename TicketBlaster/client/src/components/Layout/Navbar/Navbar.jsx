import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import { GenericButton } from "../../Buttons/GenericButton";
import { SearchBox } from "./SearchBox";
import useAuth from "../../../hooks/useAuth";
import { BsFillCartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../../store/AuthProvider";
export const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (event) => {
    console.log(searchQuery);
    event.preventDefault();
    if (searchQuery) {
      navigate(`/search?search=${searchQuery}`);
    }
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.content}>
          <div className={styles.box}>
            <ul>
              <li>
                <Link to={"/"}>
                  <img src={logo} className={styles.logo} alt="" />
                </Link>
              </li>
              <li>
                <Link to="/musicalconcerts">Musical Concerts</Link>
              </li>
              <li>
                <Link to="/comedyshows">Stand-up Comedy</Link>
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <ul>
              <li>
                <form onSubmit={handleSearchSubmit}>
                  <SearchBox placeholder="Search" onSearch={handleSearch} />
                </form>
              </li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to={"/login"}>
                      <GenericButton
                        style={{
                          backgroundColor: "#FF48AB",
                          border: "none",
                          width: "102px",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "16px",
                          height: "42px",
                        }}
                      >
                        Log in
                      </GenericButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <GenericButton
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "#FF48AB",
                          width: "200px",
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "white",
                          px: "15",
                          height: "42px",
                        }}
                      >
                        Create Account
                      </GenericButton>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/shopping/cart"}>
                      <BsFillCartFill size={"23"} color="#FF48AB" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/panel/history">
                      <FaUser size={"23"} color="#FF48AB" />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
