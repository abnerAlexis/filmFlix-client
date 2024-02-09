import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar"
import { ProfileView } from "../profile-view/profile-view";
import { ProfileFavoriteMoviesView } from "../profile-favorite-movies-view/profile-favorite-movies-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log(JSON.stringify(updatedUser));
  }

  const toggleFavorite = movieId => {
   
    if (!user) {
      return;
    }

  // Checking of the movie is already in favorites
  const isFavorite = user.FavoriteMovies.includes(movieId);
  
  //Updating user's favorites list.
  const updatedUser = {
    ...user,
    FavoriteMovies: isFavorite
      ? user.FavoriteMovies.filter((id) => id !== movieId)
      : [...user.FavoriteMovies, movieId],
  };

  //Update user state
  setUser(updatedUser);

  //Save updated user data to localStorage
  localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  const handleDeleteAccount = () => {
    onDeleteAccount();
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    
    /* 
    console.log("User: " + JSON.stringify(user));
            √ prints logged in user info
    */
    fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          /*
            console.log("\nmovie: " + JSON.stringify(movie))
                            √ prints movies
          */
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
    <BrowserRouter> 
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
          window.open('/', '_self');
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies to show.</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies} 
                      user={user}
                      onToggleFavorite={toggleFavorite}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies to show at this time.</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.Id} md={3}>
                        <MovieCard 
                          movie={movie} 
                          user={user}
                          onToggleFavorite={toggleFavorite}  
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView 
                user={user} 
                token={token}
                movies={movies}
                setUser={setUser}
                onUserUpdate={handleUserUpdate} 
                onDeleteAccount={handleDeleteAccount} 
              />
            }
            
          />
          <Route 
          path="/profile/favorites" 
          element={
            <ProfileFavoriteMoviesView
              user={user} 
              token={token}
              movies={movies}
            />
          }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

/*

return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>There are no movies to show.</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.Id} md={3}>
              <MovieCard
                key={movie.Id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );

*/
