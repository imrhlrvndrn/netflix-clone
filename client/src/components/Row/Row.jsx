import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// scss files
import './Row.scss';

// React components

const Row = ({ title, fetchUrl, setError }) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const opts = {
        height: '500px',
        width: '100%',
        playerVars: { autoplay: 1 },
    };

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setMovies(req.data.results);
            return req;
        };

        fetchData();
    }, [fetchUrl]);

    const handleTrailer = (movie) => {
        if (trailerUrl) setTrailerUrl('');
        else {
            movieTrailer(movie?.name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => {
                    setError(movie?.name || movie?.title || movie?.original_name);
                    console.log(error);
                });
        }
    };

    console.log(movies);

    return (
        <>
            {movies?.length && (
                <div className='row'>
                    {title && <h1 className='row_title'>{title}</h1>}
                    <div className='row_postersContainer'>
                        {movies.map((movie) => (
                            <img
                                onClick={() => handleTrailer(movie)}
                                key={movie.id}
                                className='row_postersContainer_image'
                                src={`${baseImageUrl}${movie?.poster_path || movie?.backdrop_path}`}
                                alt={movie?.name}
                            />
                        ))}
                    </div>
                    {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
                </div>
            )}
        </>
    );
};

export default Row;
