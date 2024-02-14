import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileFavoriteMoviesView } from "../profile-favorite-movies-view/profile-favorite-movies-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { mapMovie, updateFavoriteMovies } from "../../commons/utils";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  const toggleFavorite = async (movieId) => {
    if (!user) {
      return;
    }

    // Checking if the movie is already in favorites
    const isFavorite = user.FavoriteMovies.includes(movieId);

    //Updating user's favorites list.
    const updatedUser = {
      ...user,
      FavoriteMovies: isFavorite
        ? user.FavoriteMovies.filter((id) => id !== movieId) //remove
        : [...user.FavoriteMovies, movieId], // Add
    };

    setUser(updatedUser);

    // Update the DB by API call
    await updateFavoriteMovies(
      user.Username,
      token,
      movieId,
      isFavorite ? "DELETE" : "POST"
    );
  };

  const handleDeleteAccount = () => {
    // deleteAccount(user.Username, token);
    onUserLogout();
  };

  const onUserLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.open("/", "_self");
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (!token) {
      return;
    }
    
    fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/actors", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.ok) {
        console.log("Actors received.");
        console.log(`Actors: ${JSON.stringify(res)}`)
        return res.json()
      } else {
        console.log("Actors not received.");
      }
    })
    .then((allActors) => {
      setActors(allActors)
    });
  }, [token])

  useEffect(() => {
    //Movies from the API
    fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return mapMovie(movie, actors);
        });
        setMovies(moviesFromApi);
      });
  }, [actors]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onUserLogout} />
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
                onUserUpdate={(newUser) => {
                  setUser(newUser)
                }}
                onDeleteAccount={handleDeleteAccount}
              />
            }
          />
          <Route
            path="/profile/favorites"
            element={
              <ProfileFavoriteMoviesView
                user={user}
                movies={movies.filter((m) =>
                  user.FavoriteMovies.includes(m.Id)
                )}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
