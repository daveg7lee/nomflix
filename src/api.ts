const API_KEY = '1be92175b5979de924272649a6eb0a43';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface ITv {
  id: number;
  backdrop_path: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLatestMovie() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedMovie() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovie() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getAringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovie(keyword: string | undefined) {
  return keyword
    ? fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
      ).then((response) => response.json())
    : '';
}

export function getSearchTv(keyword: string | undefined) {
  return keyword
    ? fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`).then(
        (response) => response.json()
      )
    : '';
}
