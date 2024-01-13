import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url, perPage, search = '', threshold, currentPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

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
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        ).filter((pokemon) => pokemon.power >= threshold)

        const paginatedData = filteredData.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
        );

        setData(paginatedData);
        setTotalPages(Math.ceil(filteredData.length / perPage));
        setLoading(false);
      } catch (error) {
        setError('Something wrong happened!' + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, perPage, threshold, search, currentPage]);

  return {
    data,
    loading,
    error,
    totalPages,
  };
};

export default useFetchData;
