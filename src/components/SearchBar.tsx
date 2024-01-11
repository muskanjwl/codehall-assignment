import React, { useEffect, useState } from "react";
interface ISearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: ISearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    let debounceTimeout = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query]);

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search..."
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
