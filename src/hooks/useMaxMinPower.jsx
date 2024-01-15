import { useEffect, useState } from "react";

/**
 * 
 * @param {*} pageData - an array of the current page's data
 * @returns {minPower, maxPower} - returns the max and min power levels of the current page
 */
const useMaxMinPower = (pageData) => {
    const [minPower, setMinPower] = useState(0);
    const [maxPower, setMaxPower] = useState(0);

    useEffect(() => {
        if(pageData) {
            setMaxPower(Math.max(...pageData.map((pokemon) => pokemon.power)))
            setMinPower(Math.min(...pageData.map((pokemon) => pokemon.power)))
        }
    }, [pageData])

    return {
        minPower,
        maxPower
    }
}

export default useMaxMinPower;