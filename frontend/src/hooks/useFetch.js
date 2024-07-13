import { useState, useEffect } from 'react'


export default function useFetch(url) {

    const [data, setData] = useState(null)
    const [isLoding, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(url)
                const fetchedData = await response.json()
                setData(fetchedData)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])
    return [data, isLoding, error]
}
