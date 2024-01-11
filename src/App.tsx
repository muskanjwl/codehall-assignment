import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import useGetResponse from "./hooks/useGetResponse";

function App() {
  const [query, setQuery] = useState("");
  const [booksData, setBooksData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { data, loading, error } = useGetResponse(
  //   "https://openlibrary.org/search.json?q=" + query
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setBooksData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  console.log(booksData);
  return (
    <div className="App">
      <SearchBar onSearch={(value) => setQuery(value)} />
    </div>
  );
}

export default App;
