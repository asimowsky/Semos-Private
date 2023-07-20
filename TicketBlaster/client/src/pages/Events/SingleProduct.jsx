import React, { useEffect, useState } from "react";
import { SingleProductLayout } from "../../components/Layout/SingleProduct/SingleProductLayout";
import img from "../../assets/images/comedyclub.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../components/Constants/constants";
import { TicketService } from "../../services/ticketService";
import jwtDecode from "jwt-decode";
export const SingleProduct = () => {
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { postDataToCart } = TicketService();
  const eventId = window.location.pathname.split("/").pop();
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const userDetails = jwtDecode(token);
    setUser(userDetails);
  }, []);

  useEffect(() => {
    const getEvent = async () => {
      const response = await axios.get(
        `http://localhost:8085/api/events/find/${eventId}`
      );
      const event = response.data;
      setEvent(event);
    };
    getEvent();
  }, [eventId]);

  const handleOnChangeQuantity = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };
  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:8085/api/tickets/cart-item", {
        event: id,
        user: user._id,
        quantity: quantity,
        isPurchased: false,
      });
      navigate("/shopping/cart");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SingleProductLayout
      header={event?.title}
      date={formatDate(event.date)}
      imgSrc={event.image}
      description={event?.location}
      longDesc={event?.description}
      quantity={quantity}
      onChange={(e) => handleOnChangeQuantity(e)}
      addToCart={handleAddToCart}
    />
  );
};
