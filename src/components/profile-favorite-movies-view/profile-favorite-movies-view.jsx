import React, { useState, useEffect } from "react";
import {
  CardGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileFavoriteMoviesView = ({ user, token, onToggleFavorite }) =>{
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies data and update the state
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/movies/", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }

        );
        const data = await response.json();
        setMovies(data); // Assuming the data is an array of movies
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };
    // console.log(JSON.stringify(user));
    fetchMovies();
  }, []);

  useEffect(() => {
    // Filter favorite movies when both user and movies data are available
    if (user && movies.length > 0) {
      const userFavoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
      );
      setFavoriteMovies(userFavoriteMovies);
    }
  }, [user, movies]); // Update favorite movies whenever user or movies data changes

  const toggleFavorite = async (movieId) => {
    try {
      const response = await fetch("https://film-flix-3b34b5f2dccd.herokuapp.com//users/:Username/movies/${movieId}",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({movieId}),
      });

      if (!response.ok) {
        throw new Error("Failed ot toggle favorite status");
      }
      //Update user status based on response
      const updatedUser = await response.json();
      setUser(updatedUser);
        
    } catch (error) { 
      console.error("Error toggling favorite:", error.message);
    }
  };

  return (
    <Container>
      <div className="text-muted">
        <h5>{user.Username}</h5>
        <h6>{user.Email}</h6>
      </div>
      <Row> 
        <Col>
          <h1>Your Favorite Movies</h1>
          {favoriteMovies.length > 0 ? (
            <CardGroup>
              {favoriteMovies.map((movie) => (
                <Card key={movie._id}>
                  <Card.Img variant="top" src={movie.ImageURL} />
                  <MovieCard 
                    movie={{...movie, Id: movie._id}} 
                    user={user}
                    onToggleFavorite={toggleFavorite}  
                  />
                  <Card.Body>
                    <Card.Text>{movie.description}</Card.Text>                    
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          ) : (
            <p>You have not added any favorite movies yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

ProfileFavoriteMoviesView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  // onToggleFavorite: PropTypes.func.isRequired
};