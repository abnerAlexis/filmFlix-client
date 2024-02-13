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
    <div className="div-container">
      <div className="img-box">
        <img src={movie.Image} className="w-30" />
      </div>
      <div>
        <span className="sp-1">Title: </span>
        <span>{movie.Title}: </span>
      </div>
      <div>
        <span className="sp-1">Year: </span>
        <span>{movie.Year}: </span>
      </div>
      <div>
        <span className="sp-1">Genre:</span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span className="sp-1">Actors: </span>
        <span>{movie.Actors}: </span>
      </div>
      <div>
        <span className="sp-1">Description: </span>
        <span>{movie.Description}: </span>
      </div>
      <div>
        <span className="sp-1">Director: </span>
        <span>{movie.Director}: </span>
      </div>
      <div>
        <span className="sp-1">Featured: </span>
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
