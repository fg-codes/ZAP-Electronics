import { styled } from 'styled-components';
import { COLORS, FONTS } from '../GlobalStyles';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

// Each item in the cart is a tile, generated by this function
export const CartTile = ({ item }) => {
  const navigate = useNavigate();
  const { updateCart, setCartModal } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);

  const { _id, price, imageSrc, name, category, numInStock } = item.item;
  const cumulative = quantity && (quantity * price.substring(1)).toFixed(2);

  // when the user clicks on the item itself (white space)
  const itemClick = () => {
    setCartModal(false);
    document.body.style.overflow = 'scroll';
    navigate(`/items/${_id}`);
  }

  // // handle for the - and + buttons
  const handleCalc = (event, op) => {
    event.stopPropagation();
    if (op === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
    else if (op === 'inc' && quantity < numInStock) {
      setQuantity(prev => prev + 1)
    }
  }


  const handleUpdate = (event, op) => {
    event.stopPropagation();
    updateCart(op, item, quantity);
  }

  return (
    <Wrapper onClick={itemClick}>
      <Image src={imageSrc} alt={name} />
      <Content>
        <Sub>{category}</Sub>
        <P>{name}</P>
        <PriceBox>
          <Price>{price}</Price>
          <QuantityDiv>
            <CalcButton onClick={(e) => handleCalc(e, 'dec')}>-</CalcButton>
            {quantity}x
            <CalcButton onClick={(e) => handleCalc(e, 'inc')}>+</CalcButton>
          </QuantityDiv>
          <Price $total={1}> = ${cumulative}</Price>
          <StyledTrash onClick={(e) => handleUpdate(e, 'delete')} />
        </PriceBox>
        {quantity !== item.quantity && <Save onClick={(e) => handleUpdate(e, 'updateQty')}>Save changes</Save>}
      </Content>
    </Wrapper>
  )
}

const StyledTrash = styled(MdDeleteOutline)`
  font-size: 18px;
  color: ${COLORS.silver};
  position: absolute;
  right: 0px;
  bottom: 2px;
  transition: all 200ms ease;
  &:hover {
    scale: 1.3;
    color: darkred;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Save = styled.button`
  border: none;
  background-color: ${COLORS.orange};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
  color: ${COLORS.pure_white};
  transition: all 200ms ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const QuantityDiv = styled.div`
  color: ${COLORS.charcoal};
  font-size: ${FONTS.caption};
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const CalcButton = styled.button`
  font-size: ${FONTS.caption};
  border: 1px solid ${COLORS.silver};
  background-color: transparent;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.charcoal};
  border-radius: 3px;
  transition: all 200ms ease;
  &:hover {
    cursor: pointer;
    border: 1px solid ${COLORS.charcoal};
  }
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Price = styled.span`
  color: ${COLORS.charcoal};
  font-weight: 600;
  margin-bottom: -6px;
  width: 30%;
  ${({ $total }) => $total && `text-align: right; color: #000`};
`;

const Sub = styled.span`
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${COLORS.silver};
`;

const P = styled.p`
  color: ${COLORS.charcoal};
`;

const Content = styled.div`
  font-size: ${FONTS.caption};
  z-index: 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 30px;
  transition: all 200ms ease;
  &:hover {
    transform: translateY(-1px) translateX(-1px);
    box-shadow: 3px 3px 6px ${COLORS.light_gray}88;
    cursor: pointer;
  }
  border-bottom: 1px solid ${COLORS.light_gray}88;
`;