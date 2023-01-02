import React, { useState } from 'react';
import requests from '../../requests';

// React components
import { Search } from '../';
import { Row, ErrorHandler, Banner } from '../../components';

export const Home = ({ searchState, setSearchState }) => {
    const [error, setError] = useState('');

    return (
        <>
            {searchState ? (
                <Search setSearchState={setSearchState} />
            ) : (
                <>
                    <Banner />
                    <Row
                        setError={setError}
                        title='Only on neflix'
                        fetchUrl={requests.fetchNetflixOriginals}
                        media_type='tv'
                    />
                    <Row
                        setError={setError}
                        title='Trending now'
                        fetchUrl={requests.fetchTrending}
                    />
                    <Row setError={setError} title='Top rated' fetchUrl={requests.fetchTopRated} />
                    <Row
                        setError={setError}
                        title='Action Movies'
                        fetchUrl={requests.fetchActionMovies}
                    />
                    <Row
                        setError={setError}
                        title='Comedy Movies'
                        fetchUrl={requests.fetchComedyMovies}
                    />
                    <Row
                        setError={setError}
                        title='Horror Movies'
                        fetchUrl={requests.fetchHorrorMovies}
                    />
                    <Row
                        setError={setError}
                        title='Romance Movies'
                        fetchUrl={requests.fetchRomanceMovies}
                    />
                    <Row
                        setError={setError}
                        title='Documentaries'
                        fetchUrl={requests.fetchDocumentaries}
                    />
                    {error && <ErrorHandler setError={setError} media_name={error} />}
                </>
            )}
        </>
    );
};
