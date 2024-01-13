//importing proto-types
import PropTypes from "prop-types";

//MovieCard function component
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
        onClick={() => {
            onMovieClick(movie);
        }}
    >
        {movie.Title}
    </div>
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