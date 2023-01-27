import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { useDataLayerValue } from '../../context/data.context';
import { searchMedia } from '../../requests';
import { baseImageUrl } from '../../utils';
import { useWindowSize } from '../../hooks';

// scss files
import './Search.scss';

// components
import { MediaCard } from '../../components';

export const Search = ({ setSearchState }) => {
    const [{ search_query }, dispatch] = useDataLayerValue();
    const [searchQuery, setSearchQuery] = useState('');
    const _window = useWindowSize();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(searchMedia(searchQuery));
            dispatch({ type: 'SET_SEARCH_QUERY', result: response });
        };

        (async () => searchQuery && (await fetchData()))();
    }, [searchQuery]);

    useEffect(() => {
        const captureEsc = (event) => event?.key === 'Escape' && setSearchState(false);
        window.addEventListener('keydown', captureEsc);

        return () => window.removeEventListener('keydown', captureEsc);
    }, []);

    return (
        <div className='searchResults'>
            {_window?.width <= 1024 && (
                <input
                    autocomplete='off'
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    type='text'
                    name='searchcompbar'
                    id='searchcompbar'
                />
            )}
            <div className='searchResults_container'>
                {search_query?.data?.results?.map((result) => (
                    <MediaCard
                        key={result?.id}
                        media={result}
                        media_type={result?.media_type ? result?.media_type : 'movie'}
                    />
                ))}
            </div>
        </div>
    );
};
