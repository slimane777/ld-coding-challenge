import { useEffect, useState } from 'react'

/**
 * 
 * @param {string} value - the search term passed to be debounced 
 * @param {*} delay - the delay time that is set to 500 as default
 * @returns {string} - returns the value passed in first param after a delay
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
