import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className={`search-input ${focused ? 'focused' : ''}`}
        placeholder="Search..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className="search-icon-container">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z M21.7071068,20.2928932 C22.0976311,20.6834175 22.0976311,21.3165825 21.7071068,21.7071068 C21.3165825,22.0976311 20.6834175,22.0976311 20.2928932,21.7071068 L16.2928932,17.7071068 C15.9023689,17.3165825 15.9023689,16.6834175 16.2928932,16.2928932 C16.6834175,15.9023689 17.3165825,15.9023689 17.7071068,16.2928932 L21.7071068,20.2928932 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
