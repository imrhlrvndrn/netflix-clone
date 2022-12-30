const api_key = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${api_key}&with_networks=213`, //1024 for Amazon, 247 for YouTube, 213 for Netflix
    fetchTrending: `/trending/tv/day?api_key=${api_key}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${api_key}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${api_key}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${api_key}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${api_key}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${api_key}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${api_key}&with_genres=99`,
};

export const getSeasonDetails = (mediaId, season_number) => {
    return `tv/${mediaId}/season/${season_number}?api_key=${api_key}`;
};

export const searchMedia = (query) => {
    return `search/multi?api_key=${api_key}&query=${query}&include_adult=false`;
};

export const getCast = (mediaType, mediaId) => {
    return `${mediaType}/${mediaId}/credits?api_key=${api_key}`;
};

export const getLanguages = () => {
    return `configuration/languages?api_key=${api_key}`;
};

export const getCombinedCredits = (personId) =>
    `/person/${personId}/combined_credits?api_key=${api_key}`;

export default requests;
