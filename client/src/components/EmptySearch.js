import EmptySearchImg from "./assets/empty_search.jpg"
import { styled } from "styled-components"
import { COLORS } from "../GlobalStyles"
import { useNavigate } from "react-router-dom"

// when no items are found in the search bar
export const EmptySearch = () => {
    const navigate = useNavigate()

    const HandleButtonClick = () => {
        navigate('/')
    }
return (
    <Section>
    <Image src={EmptySearchImg} alt="Empty Search" />
    <H3>No Result Found</H3>
    <p>We've searched over 1000 items.</p>
    <p>We did not find any items for your search.</p>
    <SearchAgainButton onClick={HandleButtonClick}>Search again</SearchAgainButton>
    </Section>
)
}

const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: -200px;

p {
    color: ${COLORS.charcoal};
    margin-bottom: 5px;
}
`
const Image = styled.img`
height: 400px;
width: 400px;
border-radius: 100%;
`
const H3 = styled.h3`
color: ${COLORS.charcoal};
padding:10px;
margin-bottom: 10px;
`
const SearchAgainButton = styled.button`
margin-top: 40px;
width: 200px;
height: 40px;
background-color: ${COLORS.light_gray};
border: none;
border-radius: 5px;
font-size:18px;
color: ${COLORS.charcoal};
cursor: pointer;
transition: all 100ms ease;
&:hover {
    scale: 1.03;
}
`