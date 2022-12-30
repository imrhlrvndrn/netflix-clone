import React, { useEffect, useState } from 'react';
import axios from '../../axios';

// scss files
import './Row.scss';
import { MediaCard } from '../';

import { baseImageUrl } from '../../utils';

// React components

export const Row = ({ title, fetchUrl, setError, media_type }) => {
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
                            <MediaCard media={result} media_type={media_type} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
