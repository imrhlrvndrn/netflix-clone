import React from 'react';

// scss files
import './ErrorHandler.scss';

const ErrorHandler = ({ setError, movie_name }) => {
    const query = movie_name?.toLowerCase().split(' ').join('+');

    return (
        <div className='error'>
            <div className='error_container'>
                <h1>Trailer Not Found!</h1>
                <div className='error_container_ctas'>
                    <a href='/' onClick={() => setError('')} className='error_container_ctas_cta'>
                        Continue Browsing
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href={`https://www.google.com/search?q=${query}+official+trailer`}
                        className='error_container_ctas_cta'
                    >
                        Search for Trailer
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorHandler;
