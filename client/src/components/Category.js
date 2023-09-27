
import { useFetch } from './useFetch';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { ItemTile } from './ItemTile.js';
import { COLORS } from '../GlobalStyles.js';

// 3x3 grid for each category
export const Category = () => {
  const { category } = useParams();
  const { data: items } = useFetch(`/category/${category}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const top = useRef(null);

  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  if (!items) {
    return null; // maybe we can add a loading spinner or something
  }

  // Calculate the range of items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <>
      <GridContainer ref={top}>
        {currentItems.map((item) => (
          <ItemTile key={item._id} item={item} />
        ))}
      </GridContainer>
      <Pagination>
        {Array.from({ length: Math.ceil(items.data.length / itemsPerPage) }, (_, index) => (
          <PageNumber
            key={`Page${index+1}`}
            onClick={() => handlePageChange(index + 1)}
            $active={currentPage === index + 1}>
            {index + 1}
          </PageNumber>
        ))}
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

  ${({ $active }) => $active && `color: ${COLORS.orange}; font-weight: bold; scale: 1.1`}
`;
