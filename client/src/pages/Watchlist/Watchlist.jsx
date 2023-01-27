import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseImageUrl, formatDate } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';

// styles
import './Watchlist.scss';

// pages
import { Search } from '../';

export const Watchlist = ({ searchState, setSearchState }) => {
    const [{ watchlist }, dispatch] = useDataLayerValue();

    if (searchState) return <Search setSearchState={setSearchState} />;

    return (
        <div className='watchlist_container'>
            <h1 className='watchlist_title'>My Watchlist</h1>
            {watchlist?.map((media, index) => {
                const media_name =
                    media?.name || media?.original_name || media?.original_title || media?.title;
                const media_air_date = media?.air_date || media?.first_air_date;

                return (
                    <Link
                        to={`/${media?.media_type}/${media?.id}`}
                        className='media_content'
                        key={media?.id}
                    >
                        {baseImageUrl('original', media?.backdrop_path, media_name)}
                        <div className='content'>
                            <div className='title'>
                                <h1>
                                    {index + 1}. {media_name}
                                </h1>
                                {/* <p>{calculateRuntime(media?.runtime)}</p> */}
                            </div>
                            <p className='release_date'>
                                {!media_air_date
                                    ? null
                                    : `${formatDate('Do MMM YYYY', media_air_date)}`}
                            </p>
                            <p className='overview'>{media?.overview}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
