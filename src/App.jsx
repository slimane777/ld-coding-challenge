import { useEffect, useState } from 'react';
import useFetchData from './hooks/useFetchData';
import useMaxMinPower from './hooks/useMaxMinPower';
import { Header } from './components/Header';
import styled from 'styled-components';
import { useDebounce } from './hooks/useDebounce';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px
`

const apiUrl = '/pokemon.json';

function App() {
  const [pageSize, setPageSize] = useState(10);
  const [threshold, setThreshold] = useState(0);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search)
  const debouncedThreshold = useDebounce(threshold)

  const { 
    data: pokemons, 
    loading, error, totalPages,
    perPage, currentPage, setCurrentPage,
    handlePageChange,
  } =
    useFetchData(apiUrl, pageSize, debouncedSearch, debouncedThreshold);

  const {minPower, maxPower} = useMaxMinPower(pokemons)

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1)
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }

  const handleThreshold = (event) => {
    setThreshold(event.target.value)
    setCurrentPage(1)
  }

  if(loading){
    return <div>loading....</div>
  }

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
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <div>
        Min Power: <strong>{minPower}</strong>, Max Power:{' '}
        <strong>{maxPower}</strong>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Special Attack</th>
            <th>Special Defense</th>
            <th>Speed</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.name}</td>
              <td>{pokemon.type.join(', ')}</td>
              <td>{pokemon.hp}</td>
              <td>{pokemon.attack}</td>
              <td>{pokemon.defense}</td>
              <td>{pokemon.special_attack}</td>
              <td>{pokemon.special_defense}</td>
              <td>{pokemon.speed}</td>
              <td>{pokemon.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        rows per page {perPage}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>
    </Container>
  );
}

export default App;