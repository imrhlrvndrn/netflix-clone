import React, { useEffect, useState } from 'react';
import axios from '../../axios';

// scss files
import './Row.scss';

const Row = ({ title, fetchUrl, largeRow }) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setMovies(req.data.results);
            return req;
        };

        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className='row'>
            {title && <h1 className='row_title'>{title}</h1>}
            <div className='row_postersContainer'>
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_postersContainer_image ${largeRow && 'largeRow'}`}
                        src={`${baseImageUrl}${
                            largeRow ? movie?.poster_path : movie.backdrop_path
                        }`}
                        alt={movie?.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Row;
