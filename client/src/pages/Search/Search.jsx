import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { useDataLayerValue } from '../../context/data.context';
import { searchMedia } from '../../requests';
import { baseImageUrl } from '../../utils';
import { useWindowSize } from '../../hooks';

// scss files
import './Search.scss';

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

    console.log('search results: ', search_query);

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
                    <Link
                        key={result.id}
                        className='searchResults_container_image'
                        onClick={() => setSearchState(false)}
                        to={`/${result?.media_type ? result?.media_type : 'movie'}/${result.id}`}
                    >
                        {baseImageUrl(
                            'w300',
                            result?.poster_path || result?.backdrop_path || result?.profile_path,
                            result?.name ||
                                result?.original_name ||
                                result?.title ||
                                result?.original_title
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
