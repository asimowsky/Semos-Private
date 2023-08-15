import React, { useEffect, useState } from "react";
import { ShoppingLayout } from "../../components/Layout/Shopping/ShoppingLayout";
import { TicketService } from "../../services/ticketService";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ShoppingCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const { getDataFromCart } = TicketService();
  const navigate = useNavigate();
  const USER_ID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getDataFromCart(USER_ID);
      console.log(data);
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const handleDeleteShoppingCart = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8085/api/tickets/delete/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ShoppingLayout
        heading="Shopping Cart"
        shoppingCartItems={cartItems || []}
        checkoutButtons
        showShoppingCard
        handleRemoveShoppingCart={handleDeleteShoppingCart}
      />
    </div>
  );
};
