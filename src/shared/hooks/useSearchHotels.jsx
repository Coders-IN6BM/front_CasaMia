import { useEffect, useState } from "react"
import { searchHotelsService } from "../../services/api.jsx"

const useSearchHotels = ({ page = 1, limit = 8, search = "" } = {}) => {
  const [hotels, setHotels] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true)
      try {
        const response = await searchHotelsService({ page, limit, search })
        if (response && response.data) {
          setHotels(response.data.hotels)
          setTotalItems(response.data.total)
          setErrorMessage("")
        } else {
          setErrorMessage(response.message || "Search error")
        }
      } catch (error) {
        setErrorMessage(error.message || "Search error")
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [page, limit, search])

  return { hotels, totalItems, errorMessage, loading }
}

export default useSearchHotels
