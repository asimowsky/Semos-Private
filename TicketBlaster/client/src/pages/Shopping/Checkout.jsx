import React, { useEffect, useState } from "react";
import { CheckoutLayout } from "../../components/Layout/Shopping/CheckoutLayout";
import { EventsService } from "../../services/eventsService";
import { TicketService } from "../../services/ticketService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Checkout = () => {
  const [checkOutEvents, setCheckOutEvents] = useState([]);
  const { getDataFromCart } = TicketService();
  const navigate = useNavigate();
  const USER_ID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getDataFromCart(USER_ID);
      console.log(data);
      setCheckOutEvents(data);
    };

    fetchCartItems();
  }, []);
  const handlePayTheBillFunction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8085/api/tickets/purchase-ticket/${USER_ID}`,
        checkOutEvents
      );
      // navigate("/successful-payment", { state: { checkOutEvents } });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    console.log("yarrak");
  };
  return (
    <div>
      <CheckoutLayout
        heading="Checkout"
        selectedCards={checkOutEvents || []}
        handlePayment={handlePayTheBillFunction}
      ></CheckoutLayout>
    </div>
  );
};
