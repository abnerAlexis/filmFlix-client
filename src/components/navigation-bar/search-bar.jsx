import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);

    const handleButtonClick = () => {
        if (!searchClicked) {
            onSearch(query);
            setSearchClicked(true);
        } else {
            handleReset();
        }
    };

    const handleReset = () => {
        setQuery("");
        window.location.href = "/";
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleButtonClick();
        }
    };

    const buttonText = searchClicked ? "Reset" : "Search";

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress} // Handle Enter key press
            />
            <button style={{marginRight: 10}} onClick={handleButtonClick}>{buttonText}</button>
        </div>
    );
};
