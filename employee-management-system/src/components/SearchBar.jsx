import React from "react";

const SearchBar = ({ inputValue, onInputChange, onSearch, onFilterToggle }) => (
    <div className="flex items-center gap-4">
        <button onClick={onFilterToggle} className="p-2 bg-gray-200 rounded">
            Filter
        </button>
        <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Search by name"
            className="p-2 border rounded"
        />
        <button onClick={onSearch} className="p-2 bg-blue-500 text-white rounded">
            Search
        </button>
    </div>
);

export default SearchBar;
