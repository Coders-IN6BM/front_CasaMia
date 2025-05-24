import React, { useState } from "react"
import SearchBar from "../../components/SearchBar"
import HotelCard from "../../components/hotels/hotelCard"
import ShowHotel from "../../components/hotels/showHotel"
import useHotels from "../../hooks/useHotels"
import useSearchHotels from "../../hooks/useSearchHotels"
import PageOrder from "../../components/pageOrder"
import "../../assets/styles/hotelPage.css"

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 8

  const defaultResult = useHotels({ page: currentPage, limit: itemsPerPage })
  const searchResult = useSearchHotels({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  })

  const isSearch = searchTerm.trim() !== ""
  const { hotels, totalItems, errorMessage } = isSearch
    ? searchResult
    : defaultResult

  const loading = isSearch
    ? searchResult.loading
    : defaultResult.loading || false

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCardClick = (hotel) => {
    setSelectedHotel(hotel)
  }

  const handleCloseModal = () => {
    setSelectedHotel(null)
  }

  const userData = JSON.parse(localStorage.getItem("User"))
  const favHotels = userData?.userDetails?.favHotel || []

  return (
    <div>
      <div className="header">
        <br />
        <br />
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <p>Loading hotels...</p>}

      <div className="grid">
        {(hotels || []).map((hotel, idx) => (
          <HotelCard
            key={hotel.uid || `hotel-${idx}`}
            id={hotel.uid}
            hotelName={hotel.name}
            department={hotel.department}
            starts={parseInt(hotel.category)}
            imageUrl={hotel.imageHotel}
            onClick={() => handleCardClick(hotel)}
            onDeleted={() => setCurrentPage(currentPage)}
            className="card"
          />
        ))}
      </div>

      <PageOrder
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {selectedHotel && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <button className="modal-close" onClick={handleCloseModal}>
            &times;
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ShowHotel
              hotelName={selectedHotel.name}
              department={selectedHotel.department}
              starts={parseInt(selectedHotel.category)}
              address={selectedHotel.address}
              price={selectedHotel.price}
              imageUrl={selectedHotel.imageHotel}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelPage
