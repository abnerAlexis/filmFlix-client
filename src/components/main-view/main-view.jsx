import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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