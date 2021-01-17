import moment from 'moment';
import NetflixDefault from './react icons/netflix_default.jpg';

const api_key = 'c42face907d2855fe0fc335e8e2dfb78';

export const baseImageUrl = (size, imgUrl, altText, classNames) => {
    return imgUrl ? (
        <img
            className={classNames ? classNames : ''}
            src={`https://image.tmdb.org/t/p/${size}/${imgUrl}`}
            alt={altText}
        />
    ) : (
        <img className={classNames ? classNames : ''} src={NetflixDefault} alt={altText} />
    );
};

// Used in DetailedPage for responsive background image
export const baseImageUrlLink = (size) => `https://image.tmdb.org/t/p/${size}`;

export const formatDate = (format, date) => {
    if (date === '' || date === undefined) return `No date`;
    return moment(date).format(format);
};

export const calculateRuntime = (runtime) => {
    console.log('Type of runtime: ', typeof runtime);
    if (runtime === 0 || runtime === undefined || runtime === '' || runtime === null) return null;
    if (typeof runtime === 'object') {
        if (
            runtime[0] === 0 ||
            runtime[0] === undefined ||
            runtime[0] === '' ||
            runtime[0] === null
        )
            return null;

        const getHours = Math.floor(runtime[0] / 60) === 0 ? '' : `${Math.floor(runtime[0] / 60)}h`;
        const getMinutes =
            Math.floor(runtime[0] % 60) === 0 ? '' : `${Math.floor(runtime[0] % 60)}min`;

        console.log(`Value of runtime(object): ${getHours} ${getMinutes}`);
        return <p className='runtime'>{`${getHours} ${getMinutes}`}</p>;
    } else {
        const getHours = Math.floor(runtime / 60) === 0 ? '' : `${Math.floor(runtime / 60)}h`;
        const getMinutes = Math.floor(runtime % 60) === 0 ? '' : `${Math.floor(runtime % 60)}min`;

        console.log(`Value of runtime(everything else): ${getHours} ${getMinutes}`);
        return <p className='runtime'>{`${getHours} ${getMinutes}`}</p>;
    }
};

export const calculateAge = (birthYear) => {
    return new Date().getFullYear() - +birthYear;
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

export const searchMedia = (query) => {
    return `search/multi?api_key=${api_key}&query=${query}&include_adult=true`;
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
