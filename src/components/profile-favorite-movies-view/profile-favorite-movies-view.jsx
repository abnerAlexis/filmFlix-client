import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  CardGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export default function ProfileFavoriteMoviesView({ user, token }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies data and update the state
    // This can be an API call or any method to get movie data
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

    fetchMovies();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  useEffect(() => {
    // Filter favorite movies when both user and movies data are available
    if (user && movies.length > 0) {
      const userFavoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
      );
      setFavoriteMovies(userFavoriteMovies);
    }
  }, [user, movies]); // Update favorite movies whenever user or movies data changes

  return (
    <Container>
      <Row>
        <Col>
          <h1>Your Favorite Movies</h1>
          {favoriteMovies.length > 0 ? (
            <CardGroup>
              {favoriteMovies.map((movie) => (
                <Card key={movie._id}>
                  <Card.Img variant="top" src={movie.ImageURL} />
                  <MovieCard movie={movie} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFavorite(movie._id)}>
                      Remove from Favorites
                    </Button>
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
