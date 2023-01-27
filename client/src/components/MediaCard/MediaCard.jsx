import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks';
import { useDataLayerValue } from '../../context/data.context';
import { baseImageUrl, formatDate, limit_char, update_watchlist } from '../../utils';

// styles
import './MediaCard.scss';

export const MediaCard = ({ media, media_type }) => {
    const _window = useWindowSize();
    const [media_info, setMediaInfo] = useState(false);
    const [{ watchlist }, dispatch] = useDataLayerValue();
    const exists_in_watchlist =
        watchlist?.filter((watchlist_media) => watchlist_media?.id === media?.id)?.length > 0
            ? true
            : false;

    return (
        <div className='mediacard' onClick={() => _window?.width <= 1024 && setMediaInfo(true)}>
            {baseImageUrl(
                'w500',
                media?.poster_path || media?.backdrop_path || media?.profile_path,
                media?.name
            )}

            {media_info ||
                (!media_info && _window?.width > 1024 && (
                    <div className='mediacard_info'>
                        <div className='media_container'>
                            {baseImageUrl(
                                'w500',
                                media?.poster_path || media?.backdrop_path || media?.profile_path,
                                media?.name
                            )}
                            <div className='content'>
                                <h1 title={media?.name || media?.title}>
                                    {limit_char(media?.name || media?.title, 30)}
                                </h1>
                                <span>
                                    {formatDate(
                                        'YYYY',
                                        media?.release_date || media?.first_air_date
                                    )}
                                </span>
                                <p title={media?.overview}>
                                    {limit_char(media?.overview, _window?.width < 1024 ? 200 : 100)}
                                </p>
                            </div>
                        </div>
                        <div className='action_buttons'>
                            <button
                                onClick={() =>
                                    update_watchlist.bind({ dispatch })(exists_in_watchlist, media)
                                }
                            >
                                {exists_in_watchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                            </button>
                            <Link
                                to={`/${
                                    media?.media_type
                                        ? media?.media_type
                                        : media_type
                                        ? media_type
                                        : 'movie'
                                }/${media?.id}`}
                                target='_blank'
                            >
                                More info
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};
