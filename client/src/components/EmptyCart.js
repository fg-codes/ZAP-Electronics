import Emptycart from './assets/emptycart.png'
import { styled } from 'styled-components'
import { COLORS } from '../GlobalStyles.js';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useContext } from 'react';


// when the cart is empty
export const EmptyCart = () => {

  const { cartModal, setCartModal } = useContext(CartContext);
  const navigate = useNavigate()

  const HandleButtonClick = () => {
    navigate(`/`)
    setCartModal(!cartModal)
    document.body.style.overflow = "scroll";
  }

  return (
    <Section>
      <Image src={Emptycart} alt="Empty Cart" />
      <Title>Your cart is empty!</Title>
      <P>Cart's feeling light, but the groove's in top categories! Time to jazz up your shopping with fabulous finds!</P>
      <GoShop onClick={HandleButtonClick}>Go shop</GoShop>
    </Section>
  )
}

const Section = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`
const Image = styled.img`
  width: 20vw;
`
const Title = styled.h3`
  color: ${COLORS.charcoal};
`
const P = styled.p`
  text-align: center;
  color: ${COLORS.silver};
  margin: 0 20px;
  line-height: 20px;
  max-width: 30vw;
`;

const GoShop = styled.button`
  width: 175px;
  font-size:16px;
  border-radius: 5px;
  border: none;
  background-color: ${COLORS.orange};
  color: white;
  font-weight: bold;
  height: 30px;
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    scale: 1.05;
  }
`