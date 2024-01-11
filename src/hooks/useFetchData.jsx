import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url, perPage = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(url);

        const pokemonData = response.data.map((pokemon) => ({
            ...pokemon,
            power:
                pokemon.hp +
                pokemon.attack +
                pokemon.defense +
                pokemon.special_attack +
                pokemon.special_defense +
                pokemon.speed,
        }))

        let filteredData = []

        filteredData = pokemonData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).filter((pokemon) => pokemon.power >= threshold)

        // if(searchTerm !== ''){
        //     filteredData = pokemonData.filter((pokemon) =>
        //         pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        //     )
        // } else if (threshold > 0){
        //     // 
        // }         
        // else {
        //     filteredData = pokemonData
        // }

        const paginatedData = filteredData.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );

        setData(paginatedData);
        setTotalPages(Math.ceil(pokemonData.length / perPage));
        setLoading(false);
      } catch (error) {
        setError('Something wrong happened!' + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, perPage, searchTerm, threshold]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1)
  };

  const handleThreshold = (newThreshold) => {
    setThreshold(newThreshold)
    setCurrentPage(1)
  }

  return {
    data,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    perPage,
    searchTerm,
    threshold,
    handlePageChange,
    handleSearch,
    handleThreshold,
  };
};

export default useFetchData;
