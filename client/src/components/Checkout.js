import { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom'
import { CartTile } from './CartTile';
import styled from 'styled-components';
import { COLORS, FONTS } from '../GlobalStyles';
import { EmptyCart } from './EmptyCart';
import visa from './assets/visa.png'
import amex from './assets/amex.png'
import mc from './assets/mc.png'

// function component where the user has to enter some details and creditcard
export const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, setCartItems } = useContext(CartContext);
  const [userDetails, setUserDetails] = useState({});
  const [orderSummary, setOrderSummary] = useState({});
  const [validity, setValidity] = useState({ status: null, show: false });

  const subtotal = cartItems.reduce((acc, item) => +acc + +item.item.price.substring(1) * item.quantity, 0);
  const taxes = subtotal * 0.07;
  const total = subtotal + taxes;

  const ccValidity = (cc) => {
    if (cc.length === 15 && ['34', '37'].includes(cc.split('').splice(0, 2).join(''))) {
      setValidity({ status: amex, show: false })
      return 'amex'
    }
    else if (cc.length === 13 && cc[0] === '4') {
      setValidity({ status: visa, show: false })
      return 'visa'
    }
    else if (cc.length === 16 && ['51', '52', '53', '54', '55'].includes(cc.split('').splice(0, 2).join(''))) {
      setValidity({ status: mc, show: false })
      return 'mc'
    }
    else if (cc.length === 16 && cc[0] === '4') {
      setValidity({ status: visa, show: false })
      return 'visa'
    }
    else {
      setValidity({ status: null, show: false })
      return null
    }
  }

  useEffect(() => {
    setOrderSummary({
      subtotal: subtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      total: total.toFixed(2),
      cartItems,
    })
  }, [total])

  const handleChange = (event, type) => {
    const { name, value } = event.target;
    type === 'user' && setUserDetails({ ...userDetails, [name]: value })
    type === 'card' && setOrderSummary({ ...orderSummary, creditCard: ccValidity(value) })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validity.status) {
      setValidity({ ...validity, show: true })
      return;
    }
    else {
      const _id = Math.random().toString(16).slice(5)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ _id, userDetails, orderSummary })
      })
        .then(res => res.json())
        .then(() => {
          setCartItems([]);
          navigate(`/order/${_id}`);
        })
        .catch(error => console.log(error))
    }
  }

  return (
    cartItems.length > 0 ?
      <Section>
        <Form onSubmit={handleSubmit}>
          <Heading>BILLING DETAILS</Heading>
          <Spacer />
          <Label><Input onChange={(e) => handleChange(e, 'user')}
            disabled={cartItems.length === 0}
            type='text' id='name' name='name' placeholder='Name' required /></Label>

          <Label><Input onChange={(e) => handleChange(e, 'user')}
            type='text' id='address' name='address' placeholder='Address' required /></Label>

          <Label><Input
            onChange={(e) => handleChange(e, 'user')}
            type='email' id='email' name='email' placeholder='Email' required /></Label>

          <Label><Input
            onChange={(e) => handleChange(e, 'user')}
            type='tel' id='phone' name='phone' placeholder='Phone' required /></Label>

          <Spacer />

          <Label style={{ position: 'relative' }}><Input
            onChange={(e) => handleChange(e, 'card')}
            type='text' id='cardNumber' name='cardNumber' placeholder='Card Number' required autoComplete='off' />
            {validity.show && <InvalidCard>* Please provide a valid Credit Card number</InvalidCard>}
            <CCIcon src={validity.status} $show={validity.status} alt='credit card logo' />
          </Label>

          <HalfSizeInput>
            <Label><Input
              type='text' id='expiryDate' name='expiryDate' placeholder='Expiry Date' required autoComplete='off' /></Label>

            <Label><Input
              type='text' id='CVV' name='cvv' placeholder='CVV' required autoComplete='off' /></Label>
          </HalfSizeInput>

          <Spacer />
          <PriceDetails><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></PriceDetails>
          <PriceDetails><span>Shipping:</span> <FreeSpan>Free</FreeSpan></PriceDetails>
          <PriceDetails><span>Estimated taxes:</span> ${taxes.toFixed(2)}</PriceDetails>
          <PriceDetailsTotal><P>Total:</P> <P> ${total.toFixed(2)}</P></PriceDetailsTotal>
          <CheckoutButton type='submit'>COMPLETE PURCHASE</CheckoutButton>
        </Form>

        <Cart>
          {cartItems && cartItems.map(item => {
            return <CartTile item={item} key={item.item._id} />
          })}
        </Cart>
      </Section>
      : <EmptyCart />
  );
};

const CCIcon = styled.img`
  width: 40px;
  position: absolute;
  right: 10px;
  visibility: ${props => props.$show ? 'show' : 'hidden'};
`;


const InvalidCard = styled.div`
  font-size: ${FONTS.caption};
  padding: 10px 0px 10px;
  color: red;
  font-weight: 600;
`;

const P = styled.p`
  font-weight: 600;
`;

const FreeSpan = styled.span`
  font-style: italic;
  color: #23DC3D;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLORS.charcoal};
  font-size: ${FONTS.caption};
  padding-block: 3px;
`;

const PriceDetailsTotal = styled(PriceDetails)`
  font-size: ${FONTS.regular16};
`;


const Input = styled.input`
  font-size: ${FONTS.caption};
  padding: 10px;
  background-color: ${COLORS.pure_white};
  border: 1px solid ${COLORS.silver}66;
  border-radius: 5px;
  color: ${COLORS.charcoal};
  &::placeholder {
    color: ${COLORS.light_gray};
    font-style: italic;
  }
  &:focus {
    border: 1px solid ${COLORS.charcoal};
    background-color: ${COLORS.off_white};
    outline: none;
  }
`;

const HalfSizeInput = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Section = styled.section`
  display: flex;
  gap: 60px;
`;

const Form = styled.form`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Cart = styled.div`
  background-color: ${COLORS.pure_white};
  height: fit-content;
`;

const CheckoutButton = styled.button`
  border: none;
  margin: 10px auto;
  background-color: ${COLORS.orange};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  color: ${COLORS.charcoal};
  transition: all 200ms ease;
    &:hover {
    transform: scale(1.02);
    color: ${COLORS.pure_white};
  }
`;

const Heading = styled.p`
  color: ${COLORS.silver};
  font-size: ${FONTS.h4};
  letter-spacing: 5px;
  text-align: center;
`;

const Spacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS.silver}33;
  margin: 20px auto;
`;