/* hooks and packages */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";

/* components */
import { ItemTile } from "./ItemTile";

/* styles */
import { styled } from "styled-components";
import { COLORS } from "../GlobalStyles";

export const Brand = () => {
  const { brandId } = useParams();
  const { data: items } = useFetch(`/brand/${brandId}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  window.scrollTo(0, 0);

  if (!items) {
    return null;
  }

  // Calculate the range of items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to recall the pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <GridContainer>
        {currentItems.map((item) => (
          <ItemTile key={item._id} item={item} />
        ))}
      </GridContainer>
      <Pagination>
        {Array.from(
          { length: Math.ceil(items.data.length / itemsPerPage) },
          (_, index) => (
            <PageNumber
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              $active={currentPage === index + 1}
            >
              {index + 1}
            </PageNumber>
          )
        )}
      </Pagination>
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: fit-content(1fr);
  text-align: center;
  grid-gap: 30px;
  justify-content: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  margin: 10px 8px;
  cursor: pointer;
  transition: all 100ms ease;
  &:hover {
    scale: 1.1;
    color: ${COLORS.orange};
  }

  ${({ $active }) => $active === 'true' && `color: ${COLORS.orange}; font-weight: bold; scale: 1.1`}
`;
