import { useEffect } from "react"; // Added useEffect here
import { Card } from "../components";
import { useFetch, usePagination, useTitle } from "../hooks";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MovieList = ({
  apiPath = "",
  title,
  language = "",
  genre = "",
}) => {

  useTitle(title);

  const {
    data: movies = [],
    loading,
    error,
  } = useFetch(apiPath, "", language, genre);

  const {
    currentItems,
    currentPage,
    totalPages,
    pageNumbers,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(movies, 10);

  // --- THE FIXED LOGIC GOES HERE ---
  // Every time a user changes categories, languages, or genres,
  // force the pagination hook to jump back to page 1 and scroll up.
  useEffect(() => {
    goToPage(1);
    window.scrollTo(0, 0);
  }, [apiPath, language, genre, goToPage]); // Watches your 3 filter variables

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-white text-2xl">
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h2 className="text-red-500 text-2xl">
          Error: {error}
        </h2>
      </div>
    );
  }

  return (
    <main className="dark:bg-black min-h-screen">
      <section className="max-w-7xl mx-auto py-6 px-4">

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentItems.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">

            <IoIosArrowBack
              size={28}
              onClick={currentPage > 1 ? prevPage : undefined}
              className={
                currentPage > 1
                  ? "cursor-pointer text-white"
                  : "cursor-not-allowed text-gray-500"
              }
            />

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`
                  rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${
                    currentPage === page
                      ? "w-12 h-12 bg-gray-500 text-white font-bold text-lg"
                      : "w-8 h-8 bg-gray-700 text-white text-sm hover:bg-gray-600"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <IoIosArrowForward
              size={28}
              onClick={currentPage < totalPages ? nextPage : undefined}
              className={
                currentPage < totalPages
                  ? "cursor-pointer text-white"
                  : "cursor-not-allowed text-gray-500"
              }
            />

          </div>
        )}

      </section>
    </main>
  );
};

export default MovieList;