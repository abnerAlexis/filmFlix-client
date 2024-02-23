import React, { useState, useEffect } from "react";
import { CardGroup, Card, Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-favorite-movies-view.scss";

export const ProfileFavoriteMoviesView = ({
  user,
  movies,
  onToggleFavorite,
}) => {
  return (
    <Container>
      <div className="text-muted">
        <h5 style={{color: "whitesmoke"}}>{user.Username}</h5>
        <h6 style={{color: "whitesmoke"}}>{user.Email}</h6>
      </div>
      <Row>
        <Col>
          <h1 className="faves-title">Your Favorite Movies</h1>
          {movies.length > 0 ? (
            <CardGroup>
              {movies.map((movie) => (
                <Col className="mb-3 faves-col" key={movie.Id} md={3}>
                  <Card.Body key={movie.Id}>
                    <MovieCard
                      movie={movie}
                      user={user}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </Card.Body>
                </Col>
              ))}
            </CardGroup>
          ) : (
            <p style={{color: "whitesmoke"}}>You have not added any favorite movies yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};
