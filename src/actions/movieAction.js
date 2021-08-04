export const setMovieTitle = data => {
  return (
 { type: "movie",
  payload: data
 }
  )
};

export const setMovies = data => {
  return (
    { type: "movie", payload: data }
  )
};

export const addMovieToFavs = data => {
  return (
    { type: "favorite", payload: data }
  )
};

export const setMovieImdbId = data => {
  return (
    { type: "imdbId", payload: data }
  )
};
