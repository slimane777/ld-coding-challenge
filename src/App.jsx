import { useState } from 'react';
import useFetchData from './hooks/useFetchData';
import useMaxMinPower from './hooks/useMaxMinPower';
import { Header } from './components/Header';
import styled from 'styled-components';
import { useDebounce } from './hooks/useDebounce';
import { Pagination } from './components/Pagination';
import { Table } from './components/Table';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 50px;
  .table-wrapper {
    width: 100%;
  }
`

const apiUrl = '/pokemon.json';

function App() {
  const [pageSize, setPageSize] = useState(5);
  const [threshold, setThreshold] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearch = useDebounce(search)
  const debouncedThreshold = useDebounce(threshold)

  const { 
    data: pokemons, 
    loading, error, totalPages,
  } =
    useFetchData(apiUrl, pageSize, debouncedSearch, debouncedThreshold, currentPage);

  const {minPower, maxPower} = useMaxMinPower(pokemons)

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }

  const handleThreshold = (event) => {
    setThreshold(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if(error){
    return <div>{error}</div>
  }

  return (
    <Container>
      <Header 
        handleSearch={handleSearch} 
        handleThreshold={handleThreshold}
        searchTerm={search}
        threshold={threshold}
        minPower={minPower}
        maxPower={maxPower}
      />

      {
        loading ?
          <div>loading....</div>
        :
          <div className='table-wrapper'>
            <Table data={pokemons} />
            <Pagination 
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
      }
    </Container>
  );
}

export default App;