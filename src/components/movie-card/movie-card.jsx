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
        {movie.title}
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
    Featured: PropTypes.bool,
    Description: PropTypes.string,
    Director: PropTypes.array,
    Actors: PropTypes.array,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};