import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateEvent.module.css";
import { InputField } from "../../Forms/Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
import { GenericCard } from "../Dashboard/GenericCard";
import { EventsService } from "../../../services/eventsService";
import { formatDate } from "../../Constants/constants";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const CreateEvent = () => {
  // State variables
  const [musicalEvents, setMusicalEvents] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [optionsData, setOptionsData] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  // Services
  const { getAllEvents, createEvent } = EventsService();

  // Ref
  const fileInputRef = useRef();
  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const postDataToBackend = async () => {
    if (!selectedFile) {
      toast.error("Please upload an event image.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8085/api/events", {
        image: selectedFile,
        title: title,
        date: date,
        description: description,
        location: location,
        category: selectedCategory,
        price: price,
        relatedEvents: relatedEvents,
      });

      console.log("AJ U PM", response.data);

      if (response.data) {
        toast.success("Event Successfully created");
      }
      navigate("/panel/events");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedEvent(""); // Reset selected event when category changes
  };

  // Function to add a related event
  const handleAddRelatedEvent = () => {
    const events = selectedCategory === "Music" ? musicalEvents : comedyShows;
    const event = events.find((event) => event._id === selectedEvent);
    if (event && relatedEvents.length < 2) {
      setRelatedEvents((prevState) => [...prevState, event]);
      // Remove the selected event from the optionsData array
      setOptionsData((prevState) =>
        prevState.filter((option) => option.id !== selectedEvent)
      );
    }
  };

  // Function to remove a related event
  const handleRemoveRelatedEvent = (eventId) => {
    const event = relatedEvents.find((event) => event._id === eventId);
    setRelatedEvents((prevState) =>
      prevState.filter((event) => event._id !== eventId)
    );
    // Add the removed event back to the optionsData array
    setOptionsData((prevState) => [
      ...prevState,
      {
        id: event._id,
        value: event.title,
      },
    ]);
  };

  // Fetch musical and comedy events on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicalEventsData = await getAllEvents("Music");
        const comedyShowsData = await getAllEvents("Comedy");
        setMusicalEvents(musicalEventsData);
        setComedyShows(comedyShowsData);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch events.");
      }
    };

    fetchData();
  }, []);

  // Update optionsData when selectedCategory, musicalEvents, or comedyShows change
  useEffect(() => {
    let events = [];
    if (selectedCategory === "Music") {
      events = musicalEvents;
    } else if (selectedCategory === "Comedy") {
      events = comedyShows;
    }
    setOptionsData(
      events?.map((event) => ({
        id: event._id,
        value: event.title,
      }))
    );
  }, [selectedCategory, musicalEvents, comedyShows]);
  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <InputField
          label="Event Name"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Category"
          type="select"
          onChange={handleCategoryChange}
          optionsData={["Music", "Comedy"]}
        />
        <InputField
          label="Date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.imgPlace}>
          {/* <GenericButton >Upload Event Art</GenericButton> */}
          <button
            onClick={() => fileInputRef.current.click()}
            className={styles.btn}
          >
            Upload Event Art
          </button>

          <input
            type="file"
            accept="image/*"
            className={styles.btn}
            onChange={convertToBase64}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <div className={styles.imgContainer}>
            {selectedFile && <img src={selectedFile || ""} alt="compressed" />}
          </div>
        </div>
        <div className={styles.rightPlace}>
          <InputField
            textarea
            label="Description"
            style={{ width: "748px", height: "140px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            type="string"
            label="Ticket Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.flex}>
          <InputField
            label="Related Events"
            type="select"
            optionsData={optionsData}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedEvent(e.target.value);
            }}
          />
          <InputField
            label="Location"
            type="text"
            optionsData={optionsData}
            onChange={(e) => setLocation(e.target.value)}
          />
          <GenericButton
            className={styles.addBtn}
            onClick={handleAddRelatedEvent}
          >
            Add
          </GenericButton>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.flex}>
          {relatedEvents?.map((event) => (
            <GenericCard
              key={event._id}
              imageSrc={event.imageSrc}
              heading={event.title}
              subHeading={formatDate(event.date)}
              description={event.description}
              location={event.location}
              showRemove
              onRemove={() => handleRemoveRelatedEvent(event._id, event.title)}
            />
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.flexEnd}>
          <GenericButton className={styles.addBtn} onClick={postDataToBackend}>
            Save
          </GenericButton>
        </div>
      </div>
    </div>
  );
};
