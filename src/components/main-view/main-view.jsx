import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/movies/")
        .then((response) => response.json())
        .then(data => {
            const moviesFromApi = data.map((movie) => {
                // console.log('\nmovie: ' + JSON.stringify(movie))
              return {
                Id: movie._id,
                Title: movie.Title,
                Year: movie.Year,
                Image:movie.ImageURL,
                Genre: movie.Genre,
                Featured: movie.Featured.toString(),
                Description: movie.Description,
                Director: movie.Director.Name,
                Actors: movie.Actors.join(', ')
              };
            });
    
            setMovies(moviesFromApi);
          });
      }, []);

    if (!user) {
        return <LoginView />;
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)}/>;
    }

    // console.log('\nmovies.length: ' + movies.length)

    //If there are no movies in the list, display a message.
    if (movies.length === 0) {
        return <div>There are no movies to show.</div>
    }

    return (
        <div>
            {movies.map(movie => (
                <MovieCard 
                    key={movie.Id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};