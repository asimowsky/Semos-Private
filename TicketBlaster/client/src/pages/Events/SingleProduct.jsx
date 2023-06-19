import React from "react";
import { SingleProductLayout } from "../../components/Layout/SingleProduct/SingleProductLayout";
import img from "../../assets/images/comedyclub.jpeg";
export const SingleProduct = () => {
  // TODO BACKEND CONNECTION
  return (
    <SingleProductLayout
      header="Incubus"
      date="June 9th, 2023"
      imgSrc={img}
      description="Zagreb, Croatia"
    />
  );
};
