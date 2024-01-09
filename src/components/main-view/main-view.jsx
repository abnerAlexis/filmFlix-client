import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1, 
            title: "The Lord of the Rings: The Return of the King",
            genre: "Adventure",
            imageURL: "https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
        },
        {
            id: 2, 
            title: "Pulp Fiction",
            genre: "Crime",
            imageURL: "https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i",
        },
        {
            id: 3, 
            title: "Silence of the Lambs",
            genre: "Crime",
            imageURL: "https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544/?ref_=tt_ov_i",
        },
        {
            id: 4, 
            title: "The Good, the Bad and the Ugly",
            genre: "Western",
            imageURL: "https://www.imdb.com/title/tt0060196/mediaviewer/rm1383786241/?ref_=tt_ov_i",
        },
        {
            id: 5, 
            title: "Schindler's List",
            genre: "Drama",
            imageURL: "https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i",
    },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} />;
    }

    //If there are no movies in the list, display a message.
    if (movies.length === 0) {
        return <div>There are no movies to show.</div>
    }   
    
    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};
/*
    else {
        return (
            <div>
                {movies.map(movie => {
                    return <MovieCard movie={movie} />;
                })}
            </div>
        );
    } 
*/