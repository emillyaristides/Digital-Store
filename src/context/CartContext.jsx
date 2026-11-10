import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, quantity) => {
    setCartItems((currentItems) => [
      ...currentItems,
      {
        ...product,
        size,
        quantity,
      },
    ]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((currentItems) =>
      currentItems.filter((item, index) => index !== indexToRemove)
    );
  };

  // esvazia o carrinho inteiro
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};