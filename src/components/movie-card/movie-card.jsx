//importing proto-types
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

//MovieCard function component
export const MovieCard = ({movie, onMovieClick}) => {
  return(
    <Card onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          {movie.Year}
          {movie.Genre}
          {movie.Featured}
          {movie.Description}
          {movie.Director}
        </Card.Text>
        <Button
          // onClick={() => onMovieClick(movie)}
          variant="link">
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
  onMovieClick: PropTypes.func.isRequired
};