import React, { createContext, useState } from "react";
import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setCartitem] = useState({});

  const addToCart = (itemId) => {
    if (!cartitem[itemId]) {
      setCartitem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromcart = (itemId) => {
    setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] -1 }));
  }
  const getTotleCartAmount = () => {
    let totaleAmount=0;
    for(const item in cartitem){
      if(cartitem[item]>0){
        const food=food_list.find(prov=>prov._id===item);
      totaleAmount+=food.price*cartitem[item];
      }

    }
    return totaleAmount;
  }
  const contextValue = { 
    food_list,
    addToCart,
    removeFromcart,
    setCartitem,
    cartitem,
    getTotleCartAmount
  }; 

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );

};

export default StoreContextProvider;