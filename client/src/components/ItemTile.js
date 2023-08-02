import { styled } from "styled-components";
import { COLORS } from "../GlobalStyles";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { FaCheck } from 'react-icons/fa'

// each tile is called 9 times in the each category section (3x3 grid)
export const ItemTile = ({ item }) => {
    const { addToCart } = useContext(CartContext);
    const [bought, setBought] = useState(false);

    // quick add to cart button
    const addItemToCart = (event) => {
        event.preventDefault();
        setBought(true)
        addToCart(item._id, item.numInStock, 1);
    }

    // check if item is in stock
    const checkIfItemInStock = () => {
        if (item.numInStock > 0) {
            return item.price
        } else {
            return <OutOfStock>out of stock</OutOfStock>
        }
    }

    return (
        <ItemInfoContainer to={`/items/${item._id}`} key={item._id}>
            <ItemName>{item.name}</ItemName>
            <ItemImage src={item.imageSrc} />
            <Wrapper>
                <ItemPrice>{checkIfItemInStock()}</ItemPrice>
                {bought
                    ? <BoughtButton disabled>ITEM ADDED! <StyledCheckIcon /></BoughtButton>
                    : <CartButton id={item._id} disabled={item.numInStock <= 0} onClick={addItemToCart}>ADD TO CART </CartButton>
                }
            </Wrapper>
        </ItemInfoContainer>
    )
}

const StyledCheckIcon = styled(FaCheck)`
    color: ${COLORS.off_white};
    font-size: 20px;
    margin: -3px 0px 2px 5px;
`;

const ItemInfoContainer = styled(Link)`
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
padding: 30px;
border-radius: 15px;
background-color: ${COLORS.pure_white};
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
transition: all 200ms ease;
&:hover {
    transform: translateY(-2px) translateX(-2px);
}
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ItemName = styled.p`
transition: all 200ms ease;
cursor: pointer;
color: ${COLORS.charcoal};
    &:hover { 
        color: ${COLORS.silver};
    }
`
const ItemImage = styled.img`
cursor: pointer;
margin-block: 20px;
`

const ItemPrice = styled.span`
color: ${COLORS.charcoal};
padding-bottom: 10px;
`
const OutOfStock = styled.span`
color: ${COLORS.silver};
font-weight: bold;
`;

const CartButton = styled.button`
border: none;
background-color: ${COLORS.orange};
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 35px;
font-weight: bold;
border-radius: 6px;
cursor: pointer;
color: ${COLORS.charcoal};
transition: all 200ms ease;
    &:hover {
    transform: scale(1.05);
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

