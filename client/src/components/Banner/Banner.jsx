import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import requests from '../../requests';
import { baseImageUrlLink } from '../../utils';
import { useWindowSize } from '../../hooks';

// scss files
import './Banner.scss';

export const Banner = () => {
    const history = useHistory();
    const _window = useWindowSize();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(requests?.fetchNetflixOriginals);
            setMovie(
                res?.data?.results?.[Math?.floor(Math?.random() * res?.data?.results?.length - 1)]
            );
        };

        fetchData();
    }, []);

    return (
        <div
            className='banner'
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #0e0e0e), url(${baseImageUrlLink(
                    'original'
                )}${_window?.width > 768 ? movie?.backdrop_path : movie?.poster_path})`,
            }}
        >
            <div className='banner_content'>
                <h1 className='banner_content_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner_content_ctaContainer'>
                    <button
                        className='banner_content_ctaContainer_cta'
                        onClick={() => history.push(`/tv/${movie?.id}`)}
                    >
                        Play
                    </button>
                    <button className='banner_content_ctaContainer_cta'>My list</button>
                </div>
                <p className='banner_content_description'>
                    {movie?.overview?.length > 150
                        ? `${movie?.overview.substring(0, 150)} ...`
                        : movie?.overview}
                </p>
            </div>
            <div className='fadeBottom'></div>
        </div>
    );
};
