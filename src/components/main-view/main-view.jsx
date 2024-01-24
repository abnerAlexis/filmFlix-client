import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row } from "react-bootstrap";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        const moviesFromApi = movies.map((movie) => {
          // console.log('\nmovie: ' + JSON.stringify(movie))
          return {
            Id: movie._id,
            Title: movie.Title,
            Year: movie.Year,
            Image: movie.ImageURL,
            Genre: movie.Genre,
            Featured: movie.Featured.toString(),
            Description: movie.Description,
            Director: movie.Director.Name,
            Actors: movie.Actors.join(", "),
          };
        });

        setMovies(moviesFromApi);
        // console.log("Movies: "+JSON.stringify(movies));
      });
  }, [token]);

  return (
    <Row>
      {!user ? (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </>
      ) : selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : movies.length === 0 ? (
        <div>There are no movies to show.</div>
      ) : (
        <>
          {movies.map((movie) => (
            <MovieCard
              key={movie.Id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </>
      )}
    </Row>
  );
};
/*

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // console.log('\nmovies.length: ' + movies.length)

  //If there are no movies in the list, display a message.
  if (movies.length === 0) {
    return <div>There are no movies to show.</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.Id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );

*/
