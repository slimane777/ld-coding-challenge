import { useState } from 'react';
import useFetchData from './hooks/useFetchData';
import useMaxMinPower from './hooks/useMaxMinPower';
import { Header } from './components/Header';
import styled from 'styled-components';
import { useDebounce } from './hooks/useDebounce';
import { Pagination } from './components/Pagination';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  max-width: 1024px;
  margin: 0 auto;
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
          <div style={{width: '100%'}}>
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