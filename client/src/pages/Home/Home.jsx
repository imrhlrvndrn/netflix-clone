import React, { useState } from 'react';
import requests from '../../requests';

// pages
import { Search } from '../';

// components
import { Row, ErrorHandler, Banner } from '../../components';

export const Home = ({ searchState, setSearchState }) => {
    const [error, setError] = useState('');
    const media_rows = [
        {
            id: 1,
            title: 'only on netflix',
            fetch_url: requests?.fetchNetflixOriginals,
            media_type: 'tv',
        },
        {
            id: 2,
            title: 'trending',
            fetch_url: requests?.fetchTrending,
        },
        {
            id: 3,
            title: 'top rated',
            fetch_url: requests?.fetchTopRated,
        },
        {
            id: 4,
            title: 'action movies',
            fetch_url: requests?.fetchActionMovies,
        },
        {
            id: 5,
            title: 'comedy movies',
            fetch_url: requests?.fetchComedyMovies,
        },
        {
            id: 6,
            title: 'horror movies',
            fetch_url: requests?.fetchHorrorMovies,
        },
        {
            id: 7,
            title: 'romance movies',
            fetch_url: requests?.fetchRomanceMovies,
        },
        {
            id: 8,
            title: 'documentaries',
            fetch_url: requests?.fetchDocumentaries,
        },
    ];
    return (
        <>
            {searchState ? (
                <Search setSearchState={setSearchState} />
            ) : (
                <>
                    <Banner />
                    {media_rows?.map((row) => (
                        <Row
                            setError={setError}
                            title={row?.title}
                            fetchUrl={row?.fetch_url}
                            media_type={row?.media_type}
                        />
                    ))}
                    {error && <ErrorHandler setError={setError} media_name={error} />}
                </>
            )}
        </>
    );
};
