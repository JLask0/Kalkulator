import React, { useState, useEffect } from "react";
import { FaStar, FaFutbol } from "react-icons/fa";
import "../css/Star.css"
import axios from "axios";
import { useParams } from "react-router-dom";

const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const userId = localStorage.getItem("userId");
  const id = useParams().id;

  const getTournamentRating = async () => {
    try {
      const tournamentId = localStorage.getItem("tournamentId");
      if (!tournamentId) {
        console.log("Nie znaleziono TournamentId");
        return;
      }

      const { data } = await axios.get(`/api/v1/rating/user-rating/${tournamentId}/${userId}`);
      console.log(data.rating);
      if (data?.success && data?.rating?.ocena) {
        setRating(data?.rating?.ocena);

      } else {
        setRating(null);
      }

    }
    catch (error) {
      console.log("Error in retrieving teams:", error);
    }
  };

  useEffect(() => {
    getTournamentRating();
  }, [id]);

  const handleSetRating = async (e) => {
    e.preventDefault();
    const tournamentId = localStorage.getItem("tournamentId");
    try {
      await axios.post("/api/v1/rating/set-rating", {
        user: userId,
        ocena: e.target.value,
        tournamentId: tournamentId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditRating = async (e) => {
    e.preventDefault();
    const tournamentId = localStorage.getItem("tournamentId");
    try {
      await axios.put(`/api/v1/rating/update-rating/${id}/${userId}`, {
        user: userId,
        ocena: e.target.value,
        tournamentId: tournamentId,
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label >
            {rating === null ? (
              <>
                <input
                  type="radio"
                  name="rating"
                  id=""
                  value={ratingValue}
                  onClick={(e) => {
                    const selectedRating = Number(e.target.value);
                    setRating(selectedRating);
                    handleSetRating(e);
                  }}
                />

                <FaFutbol
                  className="star"
                  color={ratingValue <= (hover || rating) ? "#0a0a0a" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </>
            ) : (
              <>
                <input
                  type="radio"
                  name="rating"
                  id=""
                  value={ratingValue}
                  onClick={(e) => {
                    const selectedRating = Number(e.target.value);
                    setRating(selectedRating);
                    handleEditRating(e);
                  }}
                />

                <FaFutbol
                  className="star"
                  color={ratingValue <= (hover || rating) ? "#0a0a0a" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />

              </>
            )}
          </label>
        );
      })}
    </div>
  );

}

export default Rating;


