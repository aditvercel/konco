"use client";
import React, { createContext, useState } from "react";

export const cartcontext = createContext();

export default function Cartcontext({ children }) {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    // Update the cart context with the new quantities
    setCart(updatedCart);
  };
  return (
    <>
      <cartcontext.Provider
        value={{
          cart,
          setCart,
          addItemToCart,
          removeItemFromCart,
          handleQuantityChange,
        }}
      >
        {children}
      </cartcontext.Provider>
    </>
  );
}
