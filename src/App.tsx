import React, { useEffect, useState } from "react";
import AuthorModal from "./components/AuthorModal";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import useGetResponse from "./hooks/useGetResponse";

function App() {
  const [query, setQuery] = useState("");
  const [booksData, setBooksData] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);

  const [coverIDs, setCoverIDs] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authorData, setAuthorData] = useState<any>({});
  const [page, setPage] = useState(1);
  // const { data, loading, error } = useGetResponse(
  //   "https://openlibrary.org/search.json?q=" + query
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setBooksData(result);
        console.log(result);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  useEffect(() => {
    setCoverIDs(booksData?.docs?.map((book: { isbn: any }) => book.isbn[0]));
  }, [booksData]);

  useEffect(() => {
    if (selectedAuthor !== "") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://openlibrary.org/authors/${selectedAuthor}.json`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          console.log(result);
          setAuthorData(result);
        } catch (error: any) {
          console.error(error.message);
        }
      };

      fetchData();
    }
  }, [selectedAuthor]);

  return (
    <div className="App flex-col ">
      <SearchBar onSearch={(value) => setQuery(value)} />
      {!loading && query && (
        <>
          <div className="flex items-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <div className="bg-white text-gray-800 font-bold py-2 px-4">
              {page}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex justify-between flex-wrap gap-10 p-10 relative">
            {booksData?.docs?.length > 0
              ? booksData.docs?.map((book: any, index: number) => {
                  return (
                    <BookCard
                      image={`https://covers.openlibrary.org/b/isbn/${coverIDs[index]}-S.jpg`}
                      heading={book.title}
                      authorName={book.author_name[0]}
                      onClick={() => {
                        setSelectedAuthor(book.author_key);
                      }}
                    />
                  );
                })
              : "No Result found"}

            {authorData?.name && (
              <AuthorModal
                authorName={authorData.name}
                authorPicture={`https://covers.openlibrary.org/a/olid/${selectedAuthor}-S.jpg`}
                handleClose={() => {
                  setSelectedAuthor("");
                  setAuthorData({});
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
