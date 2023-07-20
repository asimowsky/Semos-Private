import React, { useEffect, useState } from "react";
import { ThankYouLayout } from "../../components/Layout/Shopping/ThankYouLayout";
import { EventsService } from "../../services/eventsService";
import image from "../../assets/images/arctic.jpg";
export const ThankYou = () => {
  const { getEvents } = EventsService();
  const musicalEvents = [
    {
      imageSrc: image,
      heading: "John Mayer",
      subHeading: "15.05.2023",

      location: "Los Angeles, USA",
    },
  ];
  //   useEffect(() => {
  //     const fetchMusicalEvents = async () => {
  //       const data = await getEvents();
  //       setMusicalEvents(data);
  //     };

  //     fetchMusicalEvents();
  //   }, []);
  return (
    <div>
      <ThankYouLayout
        heading="Thank you for your purchase!"
        selectedCards={musicalEvents || []}
      ></ThankYouLayout>
    </div>
  );
};
