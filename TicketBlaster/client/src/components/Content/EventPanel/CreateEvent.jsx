import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateEvent.module.css";
import { InputField } from "../../Forms/Input/InputField";
import { GenericButton } from "../../Buttons/GenericButton";
import { GenericCard } from "../Dashboard/GenericCard";
import { EventsService } from "../../../services/eventsService";
import {
  convertDateToYYYYMMDD,
  formatDate,
  formatDateToMMDDYYYY,
} from "../../Constants/constants";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export const CreateEvent = () => {
  // State variables
  const [musicalEvents, setMusicalEvents] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [optionsData, setOptionsData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventDetails, setEventDetails] = useState({});
  const [relatedEvents, setRelatedEvents] = useState([]);
  const navigate = useNavigate();
  // Services
  const { getEventByParams } = EventsService();
  const { eventId } = useParams();
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
    if (!eventId && !selectedFile) {
      toast.error("Please upload an event image.");
      return;
    }

    try {
      let dataToSend = {
        ...eventDetails,
        category: eventDetails.selectedCategory || selectedCategory,
        relatedEvents: eventDetails.relatedEvents || relatedEvents,
      };

      // If the eventId exists, do not include the 'image' property in the request.
      if (!eventDetails.eventId) {
        dataToSend.image = selectedFile;
      }

      const response = await axios.post("http://localhost:8085/api/events", dataToSend);

      console.log("BRAVO BE EVETI KARTA ZA KONCERT xD : ", response.data);

      if (response.data) {
        toast.success("Event Successfully created");
      }
      navigate("/panel/events");
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedEvent(""); // Reset selected event when category changes
  };

  const handleAddRelatedEventUpdate = () => {
    const events = selectedCategory === "Music" ? musicalEvents : comedyShows;
    const event = events?.find((ev) => ev._id === selectedEvent);

    if (event && eventDetails?.relatedEvents?.length < 2) { // Add a null check for relatedEvents
      setEventDetails((prevState) => ({
        ...prevState,
        relatedEvents: [...prevState.relatedEvents, event],
      }));

      // Remove the selected event from the optionsData array
      setOptionsData((prevState) =>
        prevState.filter((option) => option.id !== selectedEvent)
      );
    }
  };

  const handleAddRelatedEventCreate = (e) => {
    e.preventDefault();
    const events = selectedCategory === "Music" ? musicalEvents : comedyShows;
    const event = events?.find((ev) => ev._id === selectedEvent);

    if (event && relatedEvents.length < 2) {
      setRelatedEvents((prevRelatedEvents) => [...prevRelatedEvents, event]);

      // Remove the selected event from the optionsData array
      setOptionsData((prevState) =>
        prevState.filter((option) => option.id !== selectedEvent)
      );
    }
  };

  // Function to remove a related event
  const handleRemoveRelatedEvent = (eventId) => {
    const event = eventDetails.relatedEvents.find(
      (event) => event._id === eventId
    );
    setEventDetails((prevState) => ({
      ...prevState,
      relatedEvents: prevState.relatedEvents?.filter(
        (event) => event._id !== eventId
      ),
    }));
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
        const musicalEventsData = await getEventByParams("Music");
        const comedyShowsData = await getEventByParams("Comedy");
        setMusicalEvents(musicalEventsData);
        setComedyShows(comedyShowsData);

        let eventsData = [];
        if (selectedCategory === "Music") {
          eventsData = musicalEventsData;
        } else if (selectedCategory === "Comedy") {
          eventsData = comedyShowsData;
        }

        setOptionsData(
          eventsData?.map((event) => ({
            id: event._id,
            value: event?.title,
          }))
        );
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch events.");
      }
    };

    fetchData();
  }, []);



  // Update optionsData when selectedCategory changes
  useEffect(() => {
    let eventsData = [];
    if (selectedCategory === "Music") {
      eventsData = musicalEvents;
    } else if (selectedCategory === "Comedy") {
      eventsData = comedyShows;
    }

    setOptionsData(
      eventsData?.map((event) => ({
        id: event._id,
        value: event?.title,
      }))
    );
  }, [selectedCategory, musicalEvents, comedyShows]);

  //IF EVENT ID UPDATE THE DETAILS
  useEffect(() => {
    // Fetch data for the event if it is in edit mode
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8085/api/events/find/${eventId}`
          );
          const event = response.data;
          setEventDetails((prevState) => ({
            ...event,
            selectedCategory: event?.category,
            relatedEvents: event?.relatedEvents || [],
          }));
        } catch (error) {
          console.error("Error:", error);
          toast.error("Failed to fetch event data.");
        }
      };

      fetchEventData();
    }
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <InputField
          label="Event Name"
          type="text"
          onChange={(e) =>
            setEventDetails((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          value={eventDetails?.title}
        />
        <InputField
          label="Category"
          type="select"
          onChange={(e) => handleCategoryChange(e)}
          optionsData={["Music", "Comedy"]}
          value={selectedCategory}
        />

        <InputField
          label="Date"
          type="date"
          onChange={(e) =>
            setEventDetails((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
          value={convertDateToYYYYMMDD(
            formatDateToMMDDYYYY(eventDetails?.date)
          )}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.imgPlace}>
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
            {eventId && !selectedFile && (
              <img
                src={
                  process.env.REACT_APP_DATABASE_URL +
                  "uploads/" +
                  eventDetails?.image || ""
                }
                alt="compressed"
              />
            )}
          </div>
        </div>
        <div className={styles.rightPlace}>
          <InputField
            textarea
            label="Description"
            style={{ width: "748px", height: "140px" }}
            onChange={(e) =>
              setEventDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={eventDetails?.description}
          />
          <InputField
            type="string"
            label="Ticket Price"
            onChange={(e) =>
              setEventDetails((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            value={eventDetails?.price}
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
              setSelectedEvent(e.target.value);
            }}
          />
          <InputField
            label="Location"
            type="text"
            optionsData={optionsData}
            onChange={(e) =>
              setEventDetails((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            value={eventDetails?.location}
          />
          <GenericButton
            className={styles.addBtn}
            onClick={eventId ? handleAddRelatedEventUpdate : handleAddRelatedEventCreate}
          >
            Add
          </GenericButton>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.flex}>
          {eventId ? eventDetails.relatedEvents?.map((event) => (
            <GenericCard
              key={event?._id}
              imageSrc={event?.image}
              heading={event?.title}
              subHeading={formatDate(event?.date)}
              description={event?.description}
              location={event?.location}
              showRemove
              onRemove={() =>
                handleRemoveRelatedEvent(event?._id, event?.title)
              }
            />
          )) : relatedEvents?.map((event) => (
            <GenericCard
              key={event?._id}
              imageSrc={event?.image}
              heading={event?.title}
              subHeading={formatDate(event?.date)}
              description={event?.description}
              location={event?.location}
              showRemove
              onRemove={() =>
                handleRemoveRelatedEvent(event?._id, event?.title)
              }
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
