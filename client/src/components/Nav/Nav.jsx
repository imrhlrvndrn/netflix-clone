import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// scss files
import './Nav.scss';

// images
import avatar from './netflix_avatar.jpg';
import NetflixLogo from './NetflixLogo';

const Nav = () => {
    const [navBackground, setNavBackground] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) setNavBackground(true);
            else setNavBackground(false);
        });
        return () => window.removeEventListener('scroll', () => {});
    }, []);

    return (
        <div className={`nav ${navBackground && 'darkBackground'}`}>
            <Link to='/'>
                <NetflixLogo width='80px' height='80px' fill='#e50914' />
            </Link>
            <img className='nav_avatar' src={avatar} alt='netflix avatar' />
        </div>
    );
};

export default Nav;
