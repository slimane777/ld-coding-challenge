import { useState } from 'react';
import useFetchData from './hooks/useFetchData';
import useMaxMinPower from './hooks/useMaxMinPower';

function App() {
  const [pageSize, setPageSize] = useState(10);

  const apiUrl = '/pokemon.json'; // Replace with your actual API endpoint
  const { 
    data: pokemons, 
    loading, error, totalPages,
    perPage, currentPage, setCurrentPage,
    handlePageChange, searchTerm, handleSearch,
    handleThreshold, threshold
  } =
    useFetchData(apiUrl, pageSize);

  const {minPower, maxPower} = useMaxMinPower(pokemons)

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1)
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if(loading){
    return <div>loading....</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Pokemon name"
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <input
        type="number"
        placeholder="Search by threshold"
        value={threshold}
        onChange={(event) => handleThreshold(event.target.value)}
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
    </div>
  );
}

export default App;