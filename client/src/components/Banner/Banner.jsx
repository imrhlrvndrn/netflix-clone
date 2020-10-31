import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import requests, { baseImageUrl } from '../../requests';

// scss files
import './Banner.scss';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(requests.fetchNetflixOriginals);
            setMovie(res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]);
        };

        fetchData();
    }, []);

    return (
        <div
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${baseImageUrl('original')}${movie?.backdrop_path})`,
                backgroundPosition: 'center center',
            }}
        >
            <div className='banner_content'>
                <h1 className='banner_content_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner_content_ctaContainer'>
                    <button className='banner_content_ctaContainer_cta'>Play</button>
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

export default Banner;
