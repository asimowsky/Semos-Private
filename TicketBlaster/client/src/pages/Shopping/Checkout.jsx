import React, { useEffect, useState } from "react";
import { CheckoutLayout } from "../../components/Layout/Shopping/CheckoutLayout";
import { EventsService } from "../../services/eventsService";
import { TicketService } from "../../services/ticketService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      if (data.length === 0) {
        toast.error(
          "No selected ticket in your shopping cart, you will be redirected to home page"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    fetchCartItems();
  }, []);
  const handlePayTheBillFunction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8085/api/tickets/purchase-ticket/${USER_ID}`,
        checkOutEvents
      );
      if (response.data) {
        toast.success("payment done successfully");
      }
      navigate("/shopping/thankyou", { state: { checkOutEvents } });
    } catch (err) {
      toast.error("payment service error");
      console.log(err);
    }
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
