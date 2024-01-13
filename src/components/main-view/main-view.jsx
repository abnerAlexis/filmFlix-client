import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/")
        .then(response => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
              return {
                Id: doc._id,
                Title: doc.Title,
                Year: doc.Year,
                Image:doc.ImageURL,
                Genre: doc.Genre,
                Featured: doc.Featured,
                Description: doc.Description,
                Director: doc.Director[0],
                Actors: doc.Actors
              };
            });
    
            setMovies(moviesFromApi);
          });
      }, []);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)}/>;
    }

    //If there are no movies in the list, display a message.
    if (movies.length === 0) {
        return <div>There are no movies to show.</div>
    }   

    return (
        <div>
            {movies.map(movie => (
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};