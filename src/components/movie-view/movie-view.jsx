import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";

export const MovieView = ({ user, movies, onToggleFavorite }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.Id === decodeURIComponent(movieId));
  // const movie = movies.find((m) => m._id === decodeURIComponent(movieId));
  // console.log("movieId: " + movieId);
  // console.log("movie: " + JSON.stringify(movie));
  //console.log(JSON.stringify(movies)); //Gets all movies

  return (
    <div>
      <div>
        <img src={movie.Image} className="w-10" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}: </span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}: </span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.Actors}: </span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}: </span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}: </span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}: </span>
      </div>
      <Button
        variant={user.FavoriteMovies.includes(movie.Id) ? "danger" : "primary"}
        onClick={() => onToggleFavorite(movie.Id)}
      >
        {user && user.FavoriteMovies.includes(movie.Id)
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </Button>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
