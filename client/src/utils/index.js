import moment from 'moment';

const api_key = process.env.REACT_APP_TMDB_API_KEY;

export const generateMediaUrl = (mediaType, mediaId) => {
    return `/${mediaType}/${mediaId}?api_key=${api_key}`;
};

export const baseImageUrl = (size, imgUrl, altText = 'Default Netflix logo', classNames) => {
    return imgUrl ? (
        <img
            className={classNames ? classNames : ''}
            src={`https://image.tmdb.org/t/p/${size}/${imgUrl}`}
            alt={altText}
        />
    ) : (
        <img className={classNames ? classNames : ''} src='/netflix_default.jpg' alt={altText} />
    );
};

// Used in DetailedPage for responsive background image
export const baseImageUrlLink = (size) => `https://image.tmdb.org/t/p/${size}`;

export const formatDate = (format, date) => {
    if (date === '' || date === undefined) return `No date`;
    return moment(date).format(format);
};

export const limit_char = (sentence, limit) =>
    sentence?.length > limit && limit
        ? `${sentence.split('').slice(0, limit).join('')}...`
        : sentence;

export const calculateRuntime = (runtime) => {
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

        return <p className='runtime'>{`${getHours} ${getMinutes}`}</p>;
    } else {
        const getHours = Math.floor(runtime / 60) === 0 ? '' : `${Math.floor(runtime / 60)}h`;
        const getMinutes = Math.floor(runtime % 60) === 0 ? '' : `${Math.floor(runtime % 60)}min`;

        return <p className='runtime'>{`${getHours} ${getMinutes}`}</p>;
    }
};

export const calculateAge = (birthYear) => {
    return new Date().getFullYear() - +birthYear;
};

export function update_watchlist(exists_in_watchlist, media) {
    exists_in_watchlist
        ? this.dispatch({
              type: 'UPDATE_WATCHLIST',
              operation: 'REMOVE_FROM_WATCHLIST',
              media_id: media?.id,
          })
        : this.dispatch({
              type: 'UPDATE_WATCHLIST',
              operation: 'ADD_TO_WATCHLIST',
              media: {
                  ...media,
                  media_type: media?.media_type || 'movie',
              },
          });
}
