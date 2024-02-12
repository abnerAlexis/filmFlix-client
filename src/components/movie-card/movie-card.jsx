import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ user, movie, onToggleFavorite }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre}</Card.Text>
        <Button
          variant={
            user && user.FavoriteMovies.includes(movie.Id)
              ? "danger"
              : "primary"
          }
          onClick={() => onToggleFavorite(movie.Id)}
        >
          {user && user.FavoriteMovies.includes(movie.Id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </Button>
        <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
          <Button variant="outline-info">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//Prop constrains definitions for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number,
    Image: PropTypes.string,
    Genre: PropTypes.string,
    Featured: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
      .isRequired,
    Description: PropTypes.string,
    Director: PropTypes.string,
    Actors: PropTypes.string,
    // Actors: PropTypes.arrayOf(PropTypes.string),
    FavoriteMovies: PropTypes.array,
  }).isRequired,
};
