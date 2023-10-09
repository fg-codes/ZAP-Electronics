import { createContext, useState } from 'react'

export const CartContext = createContext(null);

// Passing the cart items and functions as a context to other components
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartModal, setCartModal] = useState(false);

  const addToCart = (item, quantity) => {
    const findIndex = cartItems.findIndex(cartItem => cartItem.item._id === item._id)
    if (findIndex > -1) {
      
      const newQuantity = item.numInStock <= cartItems[findIndex].quantity + quantity
        ? item.numInStock
        : cartItems[findIndex].quantity + quantity

      let newCart = [...cartItems];
      newCart[findIndex].quantity = newQuantity;
      setCartItems(newCart);
    }
    else {
      setCartItems([...cartItems, { item, quantity }])
    }
  }

  const updateCart = (op, item, quantity) => {
    switch (op) {
      case 'updateQty': {
        const updatedQty = cartItems.map(cartItem => {
          return cartItem.item._id === item.item._id ? { ...cartItem, quantity } : cartItem
        })
        setCartItems(updatedQty)
        return;
      }
      case 'delete': {
        setCartItems(cartItems.filter(cartItem => cartItem.item._id !== item.item._id));
        return;
      }
      default: {
        return;
      }
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, cartModal, setCartModal, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}