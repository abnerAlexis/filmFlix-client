import { useState } from "react";

//MainView component created. It acts as the homepage of the app.
export const MainView = () => {
    const [movies, setMovies] = useState([
        {id: 1, title: "The Lord of the Rings: The Return of the King"},
        {id: 2, title: "Pulp Fiction"},
        {id: 3, title: "Silence of the Lambs"},
        {id: 4, title: "The Good, the Bad and the Ugly"},
        {id: 5, title: "Schindler's List"},
    ]);

    //If there are no movies in the list, display a message.
    if (movies.length === 0) {
        return <div>There are no movies to show.</div>
    } else {
        return (
            <div>
                {movies.map(movie => {
                    return <div key={movie.id}>{movie.title}</div>;
                })}
            </div>
        );
    }    
};