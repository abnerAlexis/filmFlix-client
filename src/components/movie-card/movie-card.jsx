import React from "react";
import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ user, movie, onToggleFavorite }) => {
  return (
    <Card className="h-100 card-body">
      <Card.Img variant="top" src={movie.Image} className="movie-image"/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="card-text">{movie.Genre}</Card.Text>
        <Card.Text className="card-text description">{movie.Description.substring(0, 100)}...
          <Link className= "deatails-link" to={`/movies/${encodeURIComponent(movie.Id)}`}>
            <Button className="link-btn" variant="flat" style={{ color: '#007bff' }}>See details</Button>
          </Link>
        </Card.Text>
        <Button
          className="tgl-btn"
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
    FavoriteMovies: PropTypes.array,
  }).isRequired,
};
