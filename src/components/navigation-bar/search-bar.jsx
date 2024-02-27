import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button style={{margin: 10}} onClick={() => { onSearch(query) }}>Search</button>
        </div>
    );
}