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
            imageURL: "https://m.media-amazon.com/images/I/91LAfx+AZhL._AC_UY436_FMwebp_QL65_.jpg",
        },
        {
            id: 2, 
            title: "Pulp Fiction",
            genre: "Crime",
            imageURL: "https://m.media-amazon.com/images/I/91hqWdWIN+L._AC_UY436_FMwebp_QL65_.jpg"
        },
        {
            id: 3, 
            title: "Silence of the Lambs",
            genre: "Crime",
            imageURL: "https://m.media-amazon.com/images/I/71G5bef7vZL._AC_UY436_FMwebp_QL65_.jpg"
        },
        {
            id: 4, 
            title: "The Good, the Bad and the Ugly",
            genre: "Western",
            imageURL: "https://m.media-amazon.com/images/I/91BDDsP0clL._AC_UY436_FMwebp_QL65_.jpg",
        },
        {
            id: 5, 
            title: "Schindler's List",
            genre: "Drama",
            imageURL: "https://m.media-amazon.com/images/I/81pBGFSSSwL._AC_UY436_FMwebp_QL65_.jpg",
    },
    ]);

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