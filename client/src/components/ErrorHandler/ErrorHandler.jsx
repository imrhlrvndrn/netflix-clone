import React from 'react';

// scss files
import './ErrorHandler.scss';

export const ErrorHandler = ({ setError, media_name }) => {
    const query = media_name?.toLowerCase().split(' ').join('+');

    return (
        <div className='error'>
            <div className='overlay' onClick={() => setError('')}></div>
            <div className='error_container'>
                <h1>Trailer Not Found!</h1>
                <div className='error_container_ctas'>
                    <button onClick={() => setError('')} className='error_container_ctas_cta'>
                        Continue Browsing
                    </button>
                    <button onClick={() => setError('')} className='error_container_ctas_cta'>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href={`https://youtube.com/results?search_query=${query}+official+trailer`}
                        >
                            search on YouTube
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
};
