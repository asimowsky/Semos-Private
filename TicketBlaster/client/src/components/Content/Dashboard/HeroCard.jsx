import React from "react";
import styles from "./HeroCard.module.css";
import picture from "../../../assets/images/arctic.jpg";
import { GenericButton } from "../../Buttons/GenericButton";

export const HeroCard = () => {
    return (
        <div className={styles.box}>
            <div className={styles.imgBox}>
                <img src={picture} alt="hero" className={styles.imageSize} />
                <div className={styles.textContainer}>
                    <div className="leftBox">
                        <h2 className={styles.heading}>
                            Rage against the machine
                        </h2>
                        <p className={styles.subHeading}>
                            June 9th 2023, Vienna
                        </p>
                    </div>
                    <div className="RightBox">
                        <GenericButton
                            style={{
                                background:
                                    " #FFFFFF 0% 0% no-repeat padding-box",

                                width: "168px",
                                fontWeight: "bold",
                                fontSize: "16px",
                                color: "black",
                                px: "15",
                                height: "42px",
                            }}
                        >
                            Get Tickets
                        </GenericButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
