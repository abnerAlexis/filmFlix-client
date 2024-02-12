import React, { useState, useEffect } from "react";
import { CardGroup, Card, Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileFavoriteMoviesView = ({
  user,
  movies,
  onToggleFavorite,
}) => {
  return (
    <Container>
      <div className="text-muted">
        <h5>{user.Username}</h5>
        <h6>{user.Email}</h6>
      </div>
      <Row>
        <Col>
          <h1>Your Favorite Movies</h1>
          {movies.length > 0 ? (
            <CardGroup>
              {movies.map((movie) => (
                <Col className="mb-4" key={movie.Id} md={3}>
                  <Card key={movie.Id}>
                    <MovieCard
                      movie={movie}
                      user={user}
                      onToggleFavorite={onToggleFavorite}
                    />
                    <Card.Body>
                      <Card.Text>{movie.Description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </CardGroup>
          ) : (
            <p>You have not added any favorite movies yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};
