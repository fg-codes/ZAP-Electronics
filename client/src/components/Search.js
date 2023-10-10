import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components';
import { COLORS } from '../GlobalStyles';
import { ItemTile } from './ItemTile';
import { EmptySearch } from './EmptySearch';

export const Search = () => {
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [params] = useSearchParams();

  const query = params.get('q')
  const top = useRef(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top, behavior: 'smooth' });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/search?q=${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setSearchResults(data.data))
      .catch((error) => console.log(error))
  }, [query])

  return (
    <>
      {searchResults.length === 0
        ? <EmptySearch />
        : <>
          <GridContainer ref={top}>
            {currentItems.map((item) => (
              <ItemTile key={item._id} item={item} />
            ))}
          </GridContainer>
          <Pagination>
            {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, index) => (
              <PageNumber
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                $active={currentPage === index + 1 ? 'true' : 'false'}
              >
                {index + 1}
              </PageNumber>
            ))}
          </Pagination>
        </>
      }
    </>
  );
}

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
