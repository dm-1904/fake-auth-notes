import { useState } from "react";

export const MovieList = () => {
  const [favClass, setFavClass] = useState(Array(6).fill("not-fav"));

  const handleFavoriteClick = (index: number) => {
    const newFavClass = [...favClass];
    newFavClass[index] =
      newFavClass[index] === "not-fav" ? "is-fav" : "not-fav";
    setFavClass(newFavClass);
  };

  const movies = [
    "The Matrix",
    "Braveheart",
    "Die Hard",
    "Saving Private Ryan",
    "Django",
    "Generation Kill",
  ];

  return (
    <>
      <div className="card-container">
        {movies.map((movie, index) => (
          <div
            className="movie-card"
            key={index}
          >
            <h1>{movie}</h1>
            <button
              className="button"
              onClick={() => handleFavoriteClick(index)}
            >
              Favorite
            </button>
            <div className={`fav ${favClass[index]}`}>
              {favClass[index] === "is-fav" ? "👍🏻" : "🚫"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
