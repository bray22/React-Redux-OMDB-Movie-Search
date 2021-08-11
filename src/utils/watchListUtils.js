import parseJson from "parse-json";

export const removeWatchListItem = item => {
  const watchList = parseJson(localStorage.getItem('watchList'));
  const filteredWatchList = watchList.filter(e => e.Title !== item);
  localStorage.setItem('watchList', JSON.stringify(filteredWatchList));

  return filteredWatchList;
};
