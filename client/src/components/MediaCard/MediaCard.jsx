import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../../context/data.context';
import { useWindowSize } from '../../hooks';
import { baseImageUrl, formatDate, limit_char } from '../../utils';

// styles
import './MediaCard.scss';

export const MediaCard = ({ media, media_type }) => {
    const _window = useWindowSize();
    const history = useHistory();
    const [media_info, setMediaInfo] = useState(false);
    const [{ watchlist }, dispatch] = useDataLayerValue();
    const exists_in_watchlist =
        watchlist?.filter((watchlist_media) => watchlist_media?.id === media?.id)?.length > 0
            ? true
            : false;

    const update_watchlist = () =>
        exists_in_watchlist
            ? dispatch({
                  type: 'UPDATE_WATCHLIST',
                  operation: 'REMOVE_FROM_WATCHLIST',
                  media_id: media?.id,
              })
            : dispatch({
                  type: 'UPDATE_WATCHLIST',
                  operation: 'ADD_TO_WATCHLIST',
                  media: { ...media, media_type: media?.media_type || media_type || 'movie' },
              });

    return (
        <div
            className='mediacard'
            onMouseOver={() => _window?.width > 500 && setMediaInfo(true)}
            onMouseLeave={() => _window?.width > 500 && setMediaInfo(false)}
        >
            {baseImageUrl(
                'w500',
                media?.poster_path || media?.backdrop_path || media?.profile_path,
                media?.name
            )}
            {media_info && (
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
                                {formatDate('YYYY', media?.release_date || media?.first_air_date)}
                            </span>
                            <p title={media?.overview}>
                                {limit_char(media?.overview, _window?.width < 1024 ? 200 : 100)}
                            </p>
                        </div>
                    </div>
                    <div className='action_buttons'>
                        <button onClick={() => update_watchlist()}>
                            {exists_in_watchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                        </button>
                        <button
                            onClick={() =>
                                history.push(
                                    `/${
                                        media?.media_type
                                            ? media?.media_type
                                            : media_type
                                            ? media_type
                                            : 'movie'
                                    }/${media?.id}`
                                )
                            }
                        >
                            More info
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
