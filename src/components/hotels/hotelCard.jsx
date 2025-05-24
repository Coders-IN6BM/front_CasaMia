import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/styles/hotelCard.css";
import { Edit, Trash2 } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import useDeleteHotel from "../../shared/hooks/useDeleteHotel";
import { addFavoriteHotel, removeFavoriteHotel } from "../../services/api";
import { useNavigate } from "react-router-dom";

const HotelCard = ({
  id,
  name,
  address,
  qualification,
  category,
  amenities = [],
  status = true,
  imageUrl,
  onClick,
  showLike = true
}) => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const favHotels = userData?.userDetails?.favHotel || [];
  const isFavorite = favHotels.includes(id);

  const [liked, setLiked] = useState(isFavorite);
  const { removeHotel, loading } = useDeleteHotel();
  const navigate = useNavigate();

  let isAdmin = false;
  try {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      const user = JSON.parse(userStr);
      const role = user.userDetails?.role;
      isAdmin = role === "ADMIN_ROLE";
    }
  } catch {
    isAdmin = false;
  }

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!userData?.userDetails?._id) {
      alert("You need to be logged in to add favorites.");
      return;
    }
    const uid = userData.userDetails._id;
    if (!liked) {
      const response = await addFavoriteHotel(uid, id);
      if (response.data?.success) {
        setLiked(true);
        const favs = userData.userDetails.favHotel || [];
        userData.userDetails.favHotel = [...favs, id];
        localStorage.setItem("User", JSON.stringify(userData));
      } else {
        alert("Could not add to favorites.");
      }
    } else {
      const response = await removeFavoriteHotel(uid, id);
      if (response.data?.success) {
        setLiked(false);
        const favs = userData.userDetails.favHotel || [];
        userData.userDetails.favHotel = favs.filter(favId => favId !== id);
        localStorage.setItem("User", JSON.stringify(userData));
      } else {
        alert("Could not remove from favorites.");
      }
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (window.confirm("Do you want to delete this hotel?")) {
      const ok = await removeHotel(id);
      if (ok?.data?.success) {
        window.alert("Hotel deleted successfully");
        window.location.reload();
      } else {
        window.alert(ok?.data?.message || "Could not delete hotel");
      }
    }
  };

  return (
    <div
      className={`hotel-card ${!status ? 'inactive' : ''}`}
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {!status && <div className="overlay">Inactivo</div>}

      {isAdmin && (
        <div className="hotel-card-actions">
          <Edit
            size={35}
            className="hotel-card-action-icon"
            title="Editar"
            onClick={e => {
              e.stopPropagation();
              navigate("/hoteles/registrar-hotel", {
                state: { editMode: true, hotelId: id }
              });
            }}
          />
          <Trash2
            size={40}
            className="hotel-card-action-icon"
            title="Eliminar"
            onClick={handleDelete}
          />
        </div>
      )}

      <img
        src={imageUrl}
        alt={`Imagen de ${name}`}
        className="hotel-image"
      />

      {showLike && (
        <span
          className={`like-button${liked ? " liked" : ""}`}
          onClick={toggleLike}
          title={liked ? "Remove form Fvaorites" : "Save as favorite"}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontSize: "1.6rem",
            cursor: "pointer",
            transition: "color 0.2s",
            zIndex: 2
          }}
        >
          <FaHeart />
        </span>
      )}

      <div className="hotel-info">
        <h2 className="hotel-name">{name}</h2>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Dirección:</span> {address}
        </p>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Calificación:</span> {qualification}
        </p>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Categoría:</span> {category}
        </p>
        {amenities.length > 0 && (
          <p className="hotel-detail">
            <span style={{ fontWeight: "bold" }}>Amenidades:</span> {amenities.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  qualification: PropTypes.oneOf([
    '1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'
  ]).isRequired,
  category: PropTypes.oneOf([
    'Económico', 'Estandar', 'Boutique', 'Lujoso'
  ]).isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.bool,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
  showLike: PropTypes.bool,
};

export default HotelCard;
