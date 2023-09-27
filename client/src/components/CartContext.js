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

  const addToCart = (id, numInStock, quantity) => {
    fetch(`/items/${id}`)
      .then(res => res.json())
      .then(data => {
        fetch('/cart', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            id: data.data._id,
            name: data.data.name,
            price: data.data.price,
            category: data.data.category,
            imageSrc: data.data.imageSrc,
            numInStock: numInStock - quantity,
            quantity
          })
        })
          .then(res => res.json())
          .then(() => fetchCart())
          .catch((error) => console.log(error))
      })
      .catch(error => console.log(error))
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
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, cartModal, setCartModal, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  )
}