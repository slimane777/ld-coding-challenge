import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = '/pokemon.json';

/**
 * 
 * @param {number} perPage - number of records displayed per page
 * @param {string} search - search term to be used to filter data by name
 * @param {number} threshold - power threshold to be used to filter data by power level
 * @param {number} currentPage - the current page to be used to return the according data
 * @returns {data, loading, error, totalPages, total} - returns the appropriate data based on the params passed + loading and error states
 */
const useFetchData = (perPage, search = '', threshold, currentPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(apiUrl);

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

        setTotal(filteredData.length)
        setData(paginatedData);
        setTotalPages(Math.ceil(filteredData.length / perPage));
        setLoading(false);
      } catch (error) {
        setError('Something wrong happened!' + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [perPage, threshold, search, currentPage]);

  return {
    data,
    loading,
    error,
    totalPages,
    total,
  };
};

export default useFetchData;
