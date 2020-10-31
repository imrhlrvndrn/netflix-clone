import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { useDataLayerValue } from '../../DataLayer';
import { baseImageUrl, searchMedia } from '../../requests';
import useWindowSize from '../../utils/useWindowSize';

// scss files
import './Search.scss';

// images
import NetflixDefault from '../../react icons/netflix_default.jpg';

const Search = ({ setSearchState }) => {
    const [{ search_query }, dispatch] = useDataLayerValue();
    const [searchQuery, setSearchQuery] = useState('');
    const _window = useWindowSize();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(searchMedia(searchQuery));
            dispatch({ type: 'SET_SEARCH_QUERY', result: response });
        };

        fetchData();
    }, [searchQuery]);

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
                        className='searchResults_container_image'
                        onClick={() => setSearchState(false)}
                        to={`/${result?.media_type ? result?.media_type : 'movie'}/${result.id}`}
                    >
                        <img
                            key={result.id}
                            src={
                                `${baseImageUrl('w200')}/${
                                    result?.poster_path ||
                                    result?.backdrop_path ||
                                    result?.profile_path
                                }` || NetflixDefault
                            }
                            alt={
                                result?.name ||
                                result?.original_name ||
                                result?.title ||
                                result?.original_title
                            }
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Search;
