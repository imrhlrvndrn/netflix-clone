import React, { useEffect, useState } from 'react';
import axios from '../../axios';

// scss files
import './Row.scss';
import { Link } from 'react-router-dom';
import { baseImageUrl } from '../../requests';

// React components

const Row = ({ title, fetchUrl, setError, media_type }) => {
    const [results, setResults] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setResults(req.data);
            return req;
        };

        fetchData();
    }, [fetchUrl]);

    console.log(results);

    return (
        <>
            {results.results?.length && (
                <div className='row'>
                    {title && <h1 className='row_title'>{title}</h1>}
                    <div className='row_postersContainer'>
                        {results?.results?.map((result) => (
                            <Link
                                key={result.id}
                                className='row_postersContainer_image'
                                to={`${
                                    result?.media_type
                                        ? result?.media_type
                                        : media_type
                                        ? media_type
                                        : 'movie'
                                }/${result.id}`}
                            >
                                {baseImageUrl(
                                    'w200',
                                    result?.poster_path ||
                                        result?.backdrop_path ||
                                        result?.profile_path,
                                    result?.name
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Row;
