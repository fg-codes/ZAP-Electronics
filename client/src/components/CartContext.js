import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(null);

// Passing the cart items and functions as a context to other components
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartModal, setCartModal] = useState(false);

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = () => {
    fetch('/cart')
      .then(res => res.json())
      .then(data => {
        setCartItems(data.data)
      })
      .catch(error => console.log(error))
  }

  const addToCart = (item, quantity) => {
    setCartItems([...cartItems, { item, quantity }])
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

  const deleteFromCart = (itemId, numInStock) => {
    fetch('/cart', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ itemId, numInStock })
    })
      .then(res => res.json())
      .then(() => fetchCart())
      .catch(error => console.log(error))
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, cartModal, setCartModal, updateCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  )
}