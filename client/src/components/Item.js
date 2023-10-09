import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import styled from "styled-components";
import { COLORS, FONTS } from "../GlobalStyles";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { FaCheck } from 'react-icons/fa'
import { ItemTile } from "./ItemTile";

// Function to shuffle the array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array) => {
  const inStockItems = array.filter(item => item.numInStock > 0);
  for (let i = inStockItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [inStockItems[i], inStockItems[j]] = [inStockItems[j], inStockItems[i]];
  }
  return inStockItems;
};

// Function to get the first 4 random items
const getFirstFourRandomItems = (array) => {
  const shuffledRandomItems = shuffleArray(array);
  return shuffledRandomItems.slice(0, 3);
};

// Function component for a single item page
export const Item = () => {
  const { itemId } = useParams();
  const { data: item } = useFetch(`/items/${itemId}`);
  const { addToCart } = useContext(CartContext);
  const [brand, setBrand] = useState(null);
  const [status, setStatus] = useState({ status: 'idle', quantity: 1 });
  const [randomItems, setRandomItems] = useState([])
  const [firstFourRandomItems, setFirstFourRandomItems] = useState([])
  window.scrollTo(0, 0);

  // we need to fetch the brand details every time we load the item page
  useEffect(() => {
    item &&
      fetch(`${process.env.REACT_APP_BACKEND_URL}/brands/${item.data.companyId}`,
        { credentials: 'include' }
      )
        .then(res => res.json())
        .then(data => setBrand(data.data))
        .catch(error => console.log(error))
  }, [item])

  // loading few items for the "you may be interested in" section
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/items`,
      { credentials: 'include' }
    )
      .then(res => res.json())
      .then(data => {
        setRandomItems(data.data)
      })
      .catch(error => console.log(error))
  }, [])

  // each item has different suggestions
  useEffect(() => {
    setFirstFourRandomItems(getFirstFourRandomItems(randomItems));
  }, [itemId, randomItems])

  // handle for when the user click the add to the cart button
  const addItemToCart = (event) => {
    event.preventDefault();
    addToCart(item.data, status.quantity);
    setStatus({ ...status, status: 'bought' })
  }

  // handle for the - and + buttons
  const handleCalc = (op) => {
    if (op === 'dec' && status.quantity > 1) {
      setStatus({ ...status, quantity: status.quantity - 1 })
    }
    else if (op === 'inc' && status.quantity < item.data.numInStock) {
      setStatus({ ...status, quantity: status.quantity + 1 })
    }
  }

  return (
    item && brand &&
    <Container>
      <ItemContainer>
        <ImageDiv><img src={item.data.imageSrc} alt={item.data.name} /></ImageDiv>
        <Content>
          <H3>{item.data.name}</H3>
          <Grid>
            <P>Category: <S>{item.data.category}</S></P>
            <P>Manufacturer: <S>{brand.name}</S></P>
            <P>SKU: <S>{item.data._id}</S></P>
            <P>Country: <S>{brand.country}</S></P>
          </Grid>
          {item?.data.numInStock > 0
            ? <Grid>
              <H2>{item.data.price}</H2>
              <div>
                <P>Quantity in stock: <S>{item.data.numInStock}</S></P>
                <QuantityDiv>
                  <CalcButton onClick={() => handleCalc('dec')}>-</CalcButton>
                  {status.quantity}
                  <CalcButton onClick={() => handleCalc('inc')}>+</CalcButton>
                </QuantityDiv>
              </div>
            </Grid>
            : <OutOfStock>out of stock</OutOfStock>}
          {status?.status === 'bought'
            ? <BoughtButton disabled>ITEM ADDED!<StyledCheckIcon /></BoughtButton>
            : <CartButton disabled={item.data.numInStock <= 0} onClick={addItemToCart}>ADD TO CART</CartButton>
          }
        </Content>
      </ItemContainer>
      <HH3>You may also be interested in</HH3>
      <RandomItemsContainer>
        {firstFourRandomItems.map((randomItem, index) => (
          <ItemTile
            key={`${randomItem}+${index}`}
            item={randomItem}
          />
        ))}
      </RandomItemsContainer>
    </Container>

  );
};

const Container = styled.div`
`

const ItemContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  border-radius: 10px;
  padding: 40px;
  background-color: ${COLORS.pure_white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const ImageDiv = styled.div`
  width: 50%;
  & > * {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: fit-content(1fr);
`;

const QuantityDiv = styled.div`
  color: ${COLORS.charcoal};
  font-size: ${FONTS.h4};
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const CalcButton = styled.button`
  font-size: ${FONTS.h4};
  border: 1px solid ${COLORS.silver};
  background-color: transparent;
  width: 30px;
  height: 30px;
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

const H3 = styled.h3`
  color: ${COLORS.charcoal};
`;

const H2 = styled.h2`
  font-size: ${FONTS.sub};
  color: ${COLORS.charcoal};
  display: flex;
  align-items: center;
`;

const P = styled.p`
  color: ${COLORS.silver};
  font-weight: 700;
  margin-top: 5px;
`;

const S = styled.span`
  font-weight: initial;
`;

const CartButton = styled.button`
  border: none;
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
  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.light_gray}AA;
    color: ${COLORS.light_gray};
    &:hover {
      transform: none;
    }
  }
`;

const BoughtButton = styled(CartButton)`
&:disabled {
  background-color: ${COLORS.silver};
  color: ${COLORS.off_white};
  opacity: 1;
  cursor: inherit;
  &:hover {
    transform: none;
  }
}
`;

const StyledCheckIcon = styled(FaCheck)`
  color: ${COLORS.off_white};
  font-size: 20px;
  margin: -3px 0px 2px 5px;
`;

const OutOfStock = styled.span`
  color: ${COLORS.silver};
  font-weight: bold;
  text-align: center;
`;

const RandomItemsContainer = styled.div`
margin-top: 10px;
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
`
const HH3 = styled.h3`
margin-top: 15vh;
color: ${COLORS.charcoal};
`