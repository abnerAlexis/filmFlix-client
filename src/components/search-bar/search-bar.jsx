import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        window.location.href = "/"
    };

    return (
        <form className="d-flex justify-content-end" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button style={{ marginLeft:10 }} type="button" onClick={handleSubmit}>Search</button>
            {/* <button style={{ marginLeft: 10 }} type="button" onClick={query ? handleClear : handleSubmit}>
                {query ? "Back" : "Search"}
            </button> */}
        </form>
    );
};