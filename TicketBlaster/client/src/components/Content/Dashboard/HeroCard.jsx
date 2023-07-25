import React, { useEffect, useState } from "react";
import styles from "./HeroCard.module.css";
import picture from "../../../assets/images/arctic.jpg";
import { GenericButton } from "../../Buttons/GenericButton";
import axios from "axios";
import { formatDate } from "../../Constants/constants";
import { useNavigate } from "react-router-dom";

export const HeroCard = () => {
  const [hero, setHero] = useState();
  useEffect(() => {
    const fetchHeroEvent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/events/soonest?limit=1"
        );
        setHero(response?.data[0]);
      } catch (error) {
        console.error("Error fetching hero event:", error);
      }
    };

    fetchHeroEvent();
  }, []);
  const navigate = useNavigate();
  const navigateToSinglePage = (id) => {
    navigate(`/single/${id}`);
  };

  return (
    <div className={styles.box}>
      <div className={styles.imgBox}>
        <img
          src={process.env.REACT_APP_DATABASE_URL + "uploads/" + hero?.image}
          alt="hero"
          className={styles.imageSize}
        />
        <div className={styles.textContainer}>
          <div className="leftBox">
            <h2 className={styles.heading}>{hero?.title}</h2>
            <p className={styles.subHeading}>
              {formatDate(hero?.date)}
              &nbsp;
              {hero?.location}
            </p>
          </div>
          <div className="RightBox">
            <GenericButton
              style={{
                background: " #FFFFFF 0% 0% no-repeat padding-box",

                width: "168px",
                fontWeight: "bold",
                fontSize: "16px",
                color: "black",
                px: "15",
                height: "42px",
              }}
              onClick={() => navigateToSinglePage(hero?._id)}
            >
              Get Tickets
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  );
};
