import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import styled from "styled-components";
import { COLORS, FONTS } from "../GlobalStyles";
import celebrate from './assets/celebrate.png'
import logo from './assets/logo.png'
import visa from './assets/visa.png'
import amex from './assets/amex.png'
import mc from './assets/mc.png'

// Component function for when a user successfully orders
export const Confirmation = () => {
  const { orderId } = useParams();
  const { data } = useFetch(`/order/${orderId}`);
  const order = data && data.data
  console.log(order)
  const orderDate = data && new Date(order.date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  window.scrollTo(0, 0);

  const getCCIcon = () => {
    if (order.orderSummary.creditCard === 'visa') {
      return visa
    }
    else if (order.orderSummary.creditCard === 'amex') {
      return amex
    }
    else if (order.orderSummary.creditCard === 'mc') {
      return mc
    }
  }

  return (
    order &&
    <Section>
      <Image src={celebrate} alt='Celebration' />

      <H4>Great! You order is confirmed.</H4>
      <P>Hi {order.userDetails.name},</P>
      <P>Your order has been confirmed and will be shipped soon.</P>
      <Spacer />
      <DetailsWrapper>
        <DetailBox><span>Order date</span><Detail>{orderDate}</Detail></DetailBox>
        <DetailBox><span>Order no.</span><Detail>{order._id}</Detail></DetailBox>
        <DetailBox style={{ position: 'relative' }}>
          <span>Payment</span>
          <CCIcon src={getCCIcon()} alt='credit card logo' />
        </DetailBox>
        <DetailBox><span>Address</span><Detail>{order.userDetails.address}</Detail></DetailBox>
      </DetailsWrapper>
      <Spacer />
      <div style={{ width: '100%' }}>
        {order.orderSummary.cartItems.map((item) => {
          const { _id, imageSrc, name, price } = item.item
          return (
            <div key={_id}>
              <Item>
                <img style={{ width: '20%' }} src={imageSrc} alt={name} />
                <Content>
                  <span style={{ color: COLORS.charcoal }}>{name}</span>
                  <ItemDetails>
                    <span>Price: <span style={{ color: COLORS.charcoal }}>{price}</span></span>
                    <span>Quantity: {item.quantity}</span>
                  </ItemDetails>
                </Content>
              </Item>
              <Spacer />
            </div >
          )
        })}
      </div >
      <TotalWrapper>
        <TotalBox><span>Subtotal</span><span>${order.orderSummary.subtotal}</span></TotalBox>
        <TotalBox><span>Shipping</span><FreeSpan>Free</FreeSpan></TotalBox>
        <TotalBox><span>Taxes</span><span>${order.orderSummary.taxes}</span></TotalBox>
        <TotalBoxTotal><span>Total</span><span>${order.orderSummary.total}</span></TotalBoxTotal>
      </TotalWrapper>
      <Spacer />
      <P>We'll be sending you an email as soon as your items are on their way to you. Thank you for shopping with us!</P>
      <P style={{ fontStyle: 'italic', marginTop: '20px' }}>ZAP Electronics Team.</P>
      <Logo src={logo} />
    </Section>
  );
};

const CCIcon = styled.img`
  width: 40px;
  margin: -10px auto;
`;

const Logo = styled.img`
  width: 100px;
  margin-top: 30px;
`;

const FreeSpan = styled.span`
  font-style: italic;
  color: #23DC3D;
`;

const TotalBox = styled.div`
  position: relative;
  display: flex;
  gap: 40px;
  justify-content: space-between;
`;

const TotalBoxTotal = styled(TotalBox)`
  font-size: ${FONTS.regular16};
  font-weight: 600;
`;

const TotalWrapper = styled.div`
  margin-block: 100px;
  color: ${COLORS.charcoal};
  font-size: ${FONTS.caption};
  width: 20vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 0 0 auto;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: ${COLORS.silver};
  font-size: ${FONTS.caption};
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
`;

const Detail = styled.span`
  color: ${COLORS.charcoal};
`;

const DetailsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FONTS.caption};
  text-align: center;
  justify-content: center;
  color: ${COLORS.silver};
  gap: 5px;
`;

const P = styled.p`
  display: inline-block;
  width: 100%;
  line-height: 25px;
  color: ${COLORS.charcoal};
`;

const H4 = styled.h4` 
  color: ${COLORS.charcoal};
  margin: 40px 0px 20px;
  `;

const Spacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLORS.silver}33;
  margin: 20px auto;
`;

const Image = styled.img`
  width: 150px;
`;

const Section = styled.section`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0 auto;
  width: 40vw;
  background-color: ${COLORS.pure_white};
  border-radius: 10px;
  padding: 40px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;