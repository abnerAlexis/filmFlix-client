import { useState } from "react";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([
        {id: 1, title: "The Lord of the Rings: The Return of the King"},
        {id: 2, title: "Pulp Fiction"},
        {id: 3, title: "Silence of the Lambs"},
    ]);

    if (movies.length === 0) {
        return <div>There are no movies to show.</div>
    }

    return (
        <div>
            {movies.map(movie => {
                return <div>{movie.title}</div>;
            })}
        </div>
    );
};