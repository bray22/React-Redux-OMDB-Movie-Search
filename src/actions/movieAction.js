/* 
  fire actions for reducer and store to process
*/

export const setMovieTitle = data => {
  return ({ type: "movieTitle", payload: data})
};

export const setMovies = data => {
  return ({ type: "moviesSearch", payload: data })
};

export const addMovieToWatchList = data => {
  return (
    { type: "watchListMovie", payload: data })
};

export const setMovieImdbId = data => {
  return (
    { type: "movieImdbId", payload: data })
};
