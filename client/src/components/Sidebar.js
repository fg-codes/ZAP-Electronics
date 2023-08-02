import { styled } from "styled-components";
import { useFetch } from "./useFetch";
import { Link, NavLink } from "react-router-dom";

import logo from './assets/logo.png'
import { COLORS } from "../GlobalStyles";

// sidebar = side bar
export const Sidebar = () => {
  const {data: categories} = useFetch('/categories')
  const {data: brands} = useFetch('/brands')

  return (
    <Section>
      <Link to='/'><Logo src={logo} /></Link>
      <H3>Shop by category</H3>
      <Container>
        {categories && (categories.data.map(category => {
          return (
            <li key={category}>
              <StyledNavLink to={`/category/${category}`}>{category}</StyledNavLink>
            </li>
          )
        }))}
      </Container>
      <H3>Shop by brand</H3>
      <Container>
        {brands && (brands.data.map(brand => {
          return (
            <li key={brand._id}>
              <StyledNavLink to={`/items-by-company/${brand._id}`}>{brand.name}</StyledNavLink>
            </li>
          )
        }))}
      </Container>
    </Section>
  )
}

const Section = styled.section`
  width: fit-content;
  margin-right: 100px;
`;

const Container = styled.ul`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 20px 0 50px 28%;
`;

const H3 = styled.h3`
  text-align: center;
  color: ${COLORS.charcoal};
`

const Logo = styled.img`
  width: 120px;
  display: block;
  margin: 0 auto 35px;
  transition: all 200ms ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${COLORS.charcoal};
  transition: all 200ms ease;
  &:hover {
    color: ${COLORS.silver};
  }
  &.active {
    color: ${COLORS.orange};
  }
  &.active:hover {
    color: ${COLORS.silver};
  }
`;