import axios from '../../axios';
import requests from '../../requests';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../context/data.context';
import { baseImageUrlLink, update_watchlist } from '../../utils';

// scss files
import './Banner.scss';

export const Banner = () => {
    const _window = useWindowSize();
    const [{ watchlist }, dispatch] = useDataLayerValue();
    const [media, setMedia] = useState([]);
    const exists_in_watchlist =
        watchlist?.filter((watchlist_media) => watchlist_media?.id === media?.id)?.length > 0
            ? true
            : false;

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(requests?.fetchNetflixOriginals);
            setMedia(
                res?.data?.results?.[Math?.floor(Math?.random() * res?.data?.results?.length)]
            );
        };

        fetchData();
    }, []);

    console.log('banner media => ', media);

    return (
        <div
            className='banner'
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #0e0e0e), url(${baseImageUrlLink(
                    'original'
                )}${_window?.width > 768 ? media?.backdrop_path : media?.poster_path})`,
            }}
        >
            <div className='banner_content'>
                <h1 className='banner_content_title'>
                    {media?.title || media?.name || media?.original_name}
                </h1>
                <div className='banner_content_ctaContainer'>
                    <Link
                        target='_blank'
                        to={`/tv/${media?.id}`}
                        className='banner_content_ctaContainer_cta'
                    >
                        More info
                    </Link>
                    <button
                        className='banner_content_ctaContainer_cta'
                        onClick={() =>
                            update_watchlist.bind({ dispatch })(exists_in_watchlist, {
                                ...media,
                                media_type: 'tv',
                            })
                        }
                    >
                        {exists_in_watchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                    </button>
                </div>
                <p className='banner_content_description'>
                    {media?.overview?.length > 150
                        ? `${media?.overview?.substring(0, 150)} ...`
                        : media?.overview}
                </p>
            </div>
            <div className='fadeBottom'></div>
        </div>
    );
};
