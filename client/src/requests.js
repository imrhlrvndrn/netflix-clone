const api_key = 'c42face907d2855fe0fc335e8e2dfb78';

export const baseImageUrl = 'https://image.tmdb.org/t/p/original';

export const calculateRuntime = (runtime) => {
    if (typeof runtime === 'object') {
        if (runtime[0] === undefined) return null;
        const getHours = Math.floor(runtime[0] / 60) === 0 ? '' : `${Math.floor(runtime[0] / 60)}h`;
        const getMinutes =
            Math.floor(runtime[0] % 60) === 0 ? '' : `${Math.floor(runtime[0] % 60)}min`;

        return typeof getHours === NaN ? null : (
            <p className='runtime'>{`${getHours} ${getMinutes}`}</p>
        );
    } else {
        const getHours = Math.floor(runtime / 60) === 0 ? '' : `${Math.floor(runtime / 60)}h`;
        const getMinutes = Math.floor(runtime % 60) === 0 ? '' : `${Math.floor(runtime % 60)}min`;

        return getHours === NaN ? null : <p className='runtime'>{`${getHours} ${getMinutes}`}</p>;
    }
};

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

export const getMedia = (mediaType, mediaId) => {
    return `/${mediaType}/${mediaId}?api_key=${api_key}`;
};

export const getSeasonDetails = (mediaId, season_number) => {
    return `tv/${mediaId}/season/${season_number}?api_key=${api_key}`;
};

export default requests;
