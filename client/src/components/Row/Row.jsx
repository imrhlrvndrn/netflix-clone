import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// scss files
import './Row.scss';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

// React components

const Row = ({ title, fetchUrl, setError }) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
    // const [{}, dispatch] = useDataLayerValue();
    const [movies, setMovies] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const opts = {
        height: '500px',
        width: '100%',
        playerVars: { autoplay: 1 },
    };

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setMovies(req.data);
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
            {movies.results?.length && (
                <div className='row'>
                    {title && <h1 className='row_title'>{title}</h1>}
                    <div className='row_postersContainer'>
                        {movies?.results?.map((movie) => (
                            <Link
                                className='row_postersContainer_image'
                                to={`${movie?.media_type || 'movie'}/${movie.id}`}
                            >
                                <img
                                    onClick={() => handleTrailer(movie)}
                                    key={movie.id}
                                    src={`${baseImageUrl}${
                                        movie?.poster_path ||
                                        movie?.backdrop_path ||
                                        movie?.profil_path
                                    }`}
                                    alt={movie?.name}
                                />
                            </Link>
                        ))}
                    </div>
                    {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
                </div>
            )}
        </>
    );
};

export default Row;
