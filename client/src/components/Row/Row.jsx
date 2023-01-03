import axios from '../../axios';
import React, { useEffect, useState } from 'react';

// scss files
import './Row.scss';

// React components
import { MediaCard } from '../';

export const Row = ({ title, fetchUrl, setError, media_type }) => {
    const [results, setResults] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(fetchUrl);
            setResults(req.data);
            return req;
        };
        (async () => await fetchData())();
    }, [fetchUrl]);


    return (
        <>
            {results?.results?.length && (
                <div className='row'>
                    {title && <h1 className='row_title'>{title}</h1>}
                    <div className='row_postersContainer'>
                        {results?.results?.map((result) => (
                            <MediaCard media={result} media_type={media_type} key={result?.id} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
