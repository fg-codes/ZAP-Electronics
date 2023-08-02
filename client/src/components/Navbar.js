/* hooks and packages */
import { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { HiShoppingCart, HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

/* styles */
import { styled } from "styled-components";
import { COLORS, FONTS } from "../GlobalStyles";

/* components */
import { Cart } from './Cart';

// navbar = top of the page
export const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const { cartItems, cartModal, setCartModal } = useContext(CartContext);
  const navigate = useNavigate();

  // calculates how many items is in the cart
  let itemsQty = 0;
  if (cartItems) {
    cartItems.forEach(item => {
      itemsQty += item.quantity
    })
  }

  /* changing searchValue as the user types */
  const searchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value)
  }

  /* navigate to search results page */
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue}`);
  }

  return (
    <Section>
      <Cart/>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <HiOutlineSearch />
          <Input
            type='text'
            placeholder='Hunting for hidden treasures?'
            onChange={searchInput}
            value={searchValue}>
          </Input>
        </FormContent>
      </Form>
      <CartButton onClick={() => setCartModal(!cartModal)}>
        {itemsQty > 0 && <Quantity>{itemsQty}</Quantity>}
        <CartIcon />
      </CartButton>
    </Section>
  )
}
const CartButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${FONTS.regular16};
  display: flex;
  align-items: center;
  gap: 2px;
  & > * {
    transition: all 200ms ease;
  }
  &:hover {
    cursor: pointer;
    :first-child {
      color: ${COLORS.off_white};
    }
    :last-child {
      color: ${COLORS.silver};
      transform: rotate(5deg);
    }
  }
`;

const Quantity = styled.span`
  color: ${COLORS.charcoal};
  background-color: ${COLORS.orange};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;

const Form = styled.form`
  flex: 1;
`;

const FormContent = styled.div`
  border: 1px solid ${COLORS.light_gray};
  display: flex;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 5px;
  width: 320px;
  font-size: ${FONTS.caption};
  color: ${COLORS.charcoal};
  background-color: transparent;
  &::placeholder {
    font-size: ${FONTS.caption};
    color: ${COLORS.silver};
  }
`;

const CartIcon = styled(HiShoppingCart)`
  font-size: 30px;
  color: ${COLORS.charcoal};
`;