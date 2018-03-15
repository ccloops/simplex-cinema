import superagent from 'superagent';

export const SEARCH_BY_TITLE = title => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${__TMDB_API_KEY__}&language=en-US&query=${title}&page=1&include_adult=false`;

  return superagent.get(URL)
    .then(response => console.log(response.body.results));
};
