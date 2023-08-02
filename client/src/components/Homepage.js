/* hooks and packages */
import { Link } from 'react-router-dom';
import { useFetch } from "./useFetch.js";

/* styles */
import { styled } from "styled-components";
import { COLORS, FONTS } from '../GlobalStyles.js';

/* images and icons */
import Lifestyle from './assets/banner_lifestyle.png'
import Fitness from './assets/banner_fitness.png'
import Medical from './assets/banner_medical.png'
import Entertainment from './assets/banner_entertainment.png'
import Industrial from './assets/banner_industrial.png'
import Pets from './assets/banner_pets.png'

export const Homepage = () => {

  /* Featured items IDs and links redirection order (first tile is key 0, second tile is key 1, ...) */
  const features = {
    Lifestyle: 6583,  // Samsung Galaxy Gear Smartwatch (Rose Gold)
    Fitness: 6551,    // Fitbit Flex Cordless Activity/Sleep Tracker - Black
    Medical: 7057,    // Sportline Men's Cardio Connect Heart Rate Monitor SP1088BK
    Entertainment: 6728,  // Garmin VIRB Elite 1080p HD Action Camera with Wi-Fi and GPS
    Industrial: 6612,   // Adafruit Industries 1222 Gemma Arduino Wearable Controller
    'Pets%20and%20Animals': 6772    // High Tech Pet RX-10 Dog Collar for Pet Doors
  }

  /* Fetching specific featured items by their IDs */
  const { data: feature_lifestyle } = useFetch(`/items/${features.Lifestyle}`);
  const { data: feature_fitness } = useFetch(`/items/${features.Fitness}`);
  const { data: feature_medical } = useFetch(`/items/${features.Medical}`);
  const { data: feature_entertainment } = useFetch(`/items/${features.Entertainment}`);
  const { data: feature_industrial } = useFetch(`/items/${features.Industrial}`);
  const { data: feature_pets } = useFetch(`/items/${features['Pets%20and%20Animals']}`);

  /* Generating a random background color for each category tiles */
  const randomColor = () => {
    return COLORS[Object.keys(COLORS)[(Math.floor(Math.random() * 2))]]
  }

  return (
    feature_pets &&
    <Section>
    <Lateral $right={1} to={`/category/${Object.keys(features)[0]}`} subject={Lifestyle} backgroundcolor={randomColor()}>
      <Caption $right={1}>Wear Your Style, Embrace Your Story</Caption>
      <Sub $right={1}>LIFESTYLE</Sub>
    </Lateral>

    {feature_lifestyle &&
      <Vertical to={`/items/${feature_lifestyle.data._id}`}>
        <img src={feature_lifestyle.data.imageSrc} alt={feature_lifestyle.data.name} />
        <ItemName>{feature_lifestyle.data.name}</ItemName>
      </Vertical>}

    {feature_fitness &&
      <Vertical to={`/items/${feature_fitness.data._id}`}>
        <img src={feature_fitness.data.imageSrc} alt={feature_fitness.data.name} />
        <ItemName>{feature_fitness.data.name}</ItemName>
      </Vertical>}

    <Lateral to={`/category/${Object.keys(features)[1]}`} subject={Fitness} backgroundcolor={randomColor()}>
      <Caption>Release the Beast in You</Caption>
      <Sub>FITNESS</Sub>
    </Lateral>

    {feature_medical &&
      <Vertical to={`/items/${feature_medical.data._id}`}>
        <img src={feature_medical.data.imageSrc} alt={feature_medical.data.name} />
        <ItemName>{feature_medical.data.name}</ItemName>
      </Vertical>}

    {feature_entertainment &&
      <Vertical to={`/items/${feature_entertainment.data._id}`}>
        <img src={feature_entertainment.data.imageSrc} alt={feature_entertainment.data.name} />
        <ItemName>{feature_entertainment.data.name}</ItemName>
      </Vertical>}

    <Lateral to={`/category/${Object.keys(features)[2]}`} subject={Medical} backgroundcolor={randomColor()}>
      <Caption>Next-Gen Medical Electronics, Today</Caption>
      <Sub>MEDICAL</Sub>
    </Lateral>

    <Lateral to={`/category/${Object.keys(features)[3]}`} subject={Entertainment} backgroundcolor={randomColor()}>
      <Caption>Electronics for Joy Enthusiasts</Caption>
      <Sub>ENTERTAINMENT</Sub>
    </Lateral>

    <Lateral $right={1} to={`/category/${Object.keys(features)[4]}`} subject={Industrial} backgroundcolor={randomColor()}>
      <Caption $right={1}>Cutting-Edge Electronics for Efficiency</Caption>
      <Sub $right={1}>INDUSTRIAL</Sub>
    </Lateral>

    {feature_industrial &&
      <Vertical to={`/items/${feature_industrial.data._id}`}>
        <img src={feature_industrial.data.imageSrc} alt={feature_industrial.data.name} />
        <ItemName>{feature_industrial.data.name}</ItemName>
      </Vertical>}

    {feature_pets &&
      <Vertical to={`/items/${feature_pets.data._id}`}>
        <img src={feature_pets.data.imageSrc} alt={feature_pets.data.name} />
        <ItemName>{feature_pets.data.name}</ItemName>
      </Vertical>}

    <Lateral to={`/category/${Object.keys(features)[5]}`} subject={Pets} backgroundcolor={randomColor()}>
      <Caption>Tech for Happy Tails and Playful Paws.</Caption>
      <Sub>PETS & ANIMALS</Sub>
    </Lateral>
  </Section>
  )
}

const Lateral = styled(Link)`
  border: 1px solid transparent;
  padding: 40px 30px;
  border-radius: 15px;
  grid-column: span 2;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${props => props.subject});
  background-position: ${props => props.$right ? 'left' : 'right'} 20px top;
  background-color: ${props => props.backgroundcolor};
`;

const Vertical = styled(Link)`
  background-color: ${COLORS.pure_white};
  border: 1px solid ${COLORS.light_gray};
  padding: 30px 20px;
  border-radius: 15px;
  grid-row: span 2;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.p`
text-align: center;
transition: all 200ms ease;
cursor: pointer;
color: ${COLORS.charcoal};
  &:hover{ 
    color: ${COLORS.silver}
  }
`;

const Caption = styled.span`
  font-size: ${FONTS.caption};
  color: ${COLORS.charcoal};
  display: block;
  text-align: ${props => props.$right ? 'right' : 'left'};
`;

const Sub = styled.p`
  font-size: ${FONTS.sub};
  color: ${COLORS.pure_white};
  letter-spacing: 12px;
  margin: 5px -12px 0 0;
  font-weight: 500;
  text-align: ${props => props.$right ? 'right' : 'left '};
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  & > * {
    transition: all 200ms ease;
  }
  & > *:hover {
    transform: translateY(-2px) translateX(-2px);
    box-shadow: 3px 3px 6px ${COLORS.light_gray}AA;
    border: 1px solid transparent;
  }
`;