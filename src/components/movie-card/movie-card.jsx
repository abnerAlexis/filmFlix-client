import React from "react";
//importing proto-types
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

//MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre}</Card.Text>
        <Button
          onClick={() => onMovieClick(movie)} //- added to Card
          variant="link"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

//Prop constrains' definitions for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number,
    Image: PropTypes.string,
    Genre: PropTypes.string,
    Featured: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.string,
    Actors: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
