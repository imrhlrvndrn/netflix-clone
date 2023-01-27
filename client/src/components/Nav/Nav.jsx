import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import { searchMedia } from '../../requests';
import { useDataLayerValue } from '../../context/data.context';
import { useWindowSize } from '../../hooks';

// scss files
import './Nav.scss';

// images
import NetflixLogo from './NetflixLogo';
import { HomeIcon, SearchIcon, LibraryIcon } from '../../react icons';

export const Nav = ({ setSearchState }) => {
    const [_, dispatch] = useDataLayerValue();
    const history = useHistory();
    const _window = useWindowSize();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(searchMedia(searchQuery));
            dispatch({ type: 'SET_SEARCH_QUERY', result: response });
        };

        fetchData();
    }, [searchQuery]);

    return (
        <div className='nav'>
            {_window?.width > 1024 && (
                <>
                    <Link to='/' onClick={() => setSearchState(false)}>
                        <NetflixLogo width='80px' height='80px' fill='#e50914' />
                    </Link>
                    <input
                        autoComplete='off'
                        onFocus={() => setSearchState(true)}
                        onBlur={() =>
                            setTimeout(() => {
                                setSearchState(false);
                            }, 500)
                        }
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e?.target?.value);
                        }}
                        type='text'
                        name='searchbar'
                        id='searchbar'
                        placeholder='Search for movies and tv shows'
                    />
                    <img
                        onClick={() => history.push('/watchlist')}
                        className='nav_avatar'
                        src='/netflix_avatar.jpg'
                        alt='netflix avatar'
                    />
                </>
            )}

            {_window?.width <= 1024 && (
                <>
                    <button onClick={() => history.push('/')}>
                        <HomeIcon />
                    </button>
                    <button onClick={() => history.push('/search')}>
                        <SearchIcon />
                    </button>
                    <button onClick={() => history.push('/watchlist')}>
                        <LibraryIcon />
                    </button>
                </>
            )}
        </div>
    );
};
