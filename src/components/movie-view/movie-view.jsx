import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  
  const movie = movies.find((m) => m.Id === movieId);
  // console.log("movieId: " + movieId);
  // console.log("movie: " + JSON.stringify(movie));
  //console.log(JSON.stringify(movies)); //Gets all movies

  return (
    <div>
      <div>
        <img src={movie.Image} className="w-100"  /> 
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
/*
  export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.Image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Year: </span>
          <span>{movie.Year}</span>
        </div>
        <div>
          <span>Image: </span>
          <span>{movie.Image}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.Actors}</span>
        </div>
        <button
          className="back-button"
          onClick={onBackClick}
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    );
  };
*/
