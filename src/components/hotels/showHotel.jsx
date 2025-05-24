import React from "react";
import "../../assets/styles/showHotel.css";

const ShowHotel = ({ name, address, qualification, category, amenities = [], imageUrl,  status = true,}) => {
  return (
    <div className={`card-hotel ${!status ? 'inactive' : ''}`}>
      {!status && <div className="overlay">Inactive</div>}

      <img
        src={imageUrl}
        alt={`Image of ${name}`}
        className="image-hotel"
      />

      <div className="info-hotel">
        <h2 className="name-hotel">{name}</h2>
        <p className="detail-hotel">
          <span className="bold-text">Address:</span> {address}
        </p>
        <p className="detail-hotel">
          <span className="bold-text">Qualification:</span> {qualification}
        </p>
        <p className="detail-hotel">
          <span className="bold-text">Category:</span> {category}
        </p>
        {amenities.length > 0 && (
          <p className="detail-hotel">
            <span className="bold-text">Amenities:</span> {amenities.join(', ')}
          </p>
        )}
        <button className="hotel-button-horizontal">
          View Rooms
        </button>
      </div>
    </div>
  );
};

export default ShowHotel;
