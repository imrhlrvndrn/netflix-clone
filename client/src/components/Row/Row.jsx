import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// scss files
import './Row.scss';
import { Link } from 'react-router-dom';
import { baseImageUrl } from '../../requests';

// React components

const Row = ({ title, fetchUrl, setError, media_type }) => {
    const [results, setResults] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const opts = {
        height: '500px',
        width: '100%',
        playerVars: { autoplay: 1 },
    };

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setResults(req.data);
            return req;
        };

        fetchData();
    }, [fetchUrl]);

    const handleTrailer = (result) => {
        if (trailerUrl) setTrailerUrl('');
        else {
            movieTrailer(result?.name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => {
                    setError(
                        result?.name ||
                            result?.original_name ||
                            result?.title ||
                            result?.original_title
                    );
                    console.log(error);
                });
        }
    };

    console.log(results);

    return (
        <>
            {results.results?.length && (
                <div className='row'>
                    {title && <h1 className='row_title'>{title}</h1>}
                    <div className='row_postersContainer'>
                        {results?.results?.map((result) => (
                            <Link
                                className='row_postersContainer_image'
                                to={`${
                                    result?.media_type
                                        ? result?.media_type
                                        : media_type
                                        ? media_type
                                        : 'movie'
                                }/${result.id}`}
                            >
                                <img
                                    onClick={() => handleTrailer(result)}
                                    key={result.id}
                                    src={`${baseImageUrl('w200')}${
                                        result?.poster_path ||
                                        result?.backdrop_path ||
                                        result?.profile_path
                                    }`}
                                    alt={result?.name}
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
