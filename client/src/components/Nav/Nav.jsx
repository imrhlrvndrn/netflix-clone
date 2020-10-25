import React, { useEffect, useState } from 'react';

// scss files
import './Nav.scss';

// images
import logo from './netflix_logo.png';
import avatar from './netflix_avatar.jpg';

const Nav = () => {
    const [navBackground, setNavBackground] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) setNavBackground(true);
            else setNavBackground(false);
        });
        return () => window.removeEventListener('scroll');
    }, []);

    return (
        <div className={`nav ${navBackground && 'darkBackground'}`}>
            <img className='nav_logo' src={logo} alt='netflix logo' />
            <img
                className='nav_avatar'
                src={avatar}
                alt='netflix avatar image'
            />
        </div>
    );
};

export default Nav;
