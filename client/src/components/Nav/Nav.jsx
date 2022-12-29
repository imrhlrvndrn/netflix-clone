import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import { searchMedia } from '../../requests';
import { useDataLayerValue } from '../../context/data.context';
import useWindowSize from '../../utils/useWindowSize';

// scss files
import './Nav.scss';

// images
import NetflixLogo from './NetflixLogo';
import HomeIcon from '../../react icons/HomeIcon';
import SearchIcon from '../../react icons/SearchIcon';
import LibraryIcon from '../../react icons/LibraryIcon';

const Nav = ({ setSearchState }) => {
    const [{ search_query }, dispatch] = useDataLayerValue();
    const history = useHistory();
    const _window = useWindowSize();
    const [searchQuery, setSearchQuery] = useState('');
    const [navBackground, setNavBackground] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) setNavBackground(true);
            else setNavBackground(false);
        });
        return () => window.removeEventListener('scroll', () => {});
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(searchMedia(searchQuery));
            dispatch({ type: 'SET_SEARCH_QUERY', result: response });
        };

        fetchData();
    }, [searchQuery]);

    return (
        <div className={`nav ${navBackground && 'darkBackground'}`}>
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
                            setSearchQuery(e.target.value);
                        }}
                        type='text'
                        name='searchbar'
                        id='searchbar'
                        placeholder='Search for movies and tv shows'
                    />
                    <img className='nav_avatar' src='/netflix_avatar.jpg' alt='netflix avatar' />
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
                    <button onClick={() => history.push('/library')}>
                        <LibraryIcon />
                    </button>
                </>
            )}
        </div>
    );
};

export default Nav;
