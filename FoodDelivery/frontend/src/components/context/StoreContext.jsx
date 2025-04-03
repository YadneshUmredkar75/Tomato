import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setCartitem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const url = "http://localhost:4000";

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      console.log("Fetching from:", `${url}/api/food/list`);
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Response:", response.data);
      
      setFood_list(response.data.data); // Make sure you're setting the correct key
  
      // Add a delay to ensure React updates state
      setTimeout(() => {
        console.log("Updated Food List:", food_list);
      }, 1000);
    } catch (error) {
      console.error("Error fetching food:", error.response ? error.response.data : error.message);
    }
  };
  
  
  
  useEffect(() => {
    fetchFoodList();
  }, []); // Dependency array is empty, runs only once
  
  useEffect(() => {
    console.log("Food list updated:", food_list);
  }, [food_list]); // Runs whenever food_list changes
  

  // Add item to cart
  const addToCart = (itemId) => {
    setCartitem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromcart = (itemId) => {
    setCartitem((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });
  };

  // Calculate total cart amount
  const getTotleCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId] > 0) {
        const food = food_list.find((item) => item._id === itemId);
        if (food) {
          totalAmount += food.price * cartitem[itemId];
        }
      }
    }
    return totalAmount;
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  },[])
  const contextValue = {
    food_list,
    addToCart,
    removeFromcart,
    setCartitem,
    cartitem,
    getTotleCartAmount,
    url,
    setToken,
    token,
    setFood_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
