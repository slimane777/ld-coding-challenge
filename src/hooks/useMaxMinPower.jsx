import { useEffect, useState } from "react";


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