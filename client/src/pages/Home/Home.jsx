import React, { useState } from 'react';
import useWindowSize from '../../utils/useWindowSize';

// React components
import Banner from '../../components/Banner/Banner';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import Row from '../../components/Row/Row';
import requests from '../../requests';
import Search from '../Search/Search';

const Home = ({ searchState, setSearchState }) => {
    // const _window = useWindowSize();
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
                        title='Neflix Originals'
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
                    {error && <ErrorHandler setError={setError} movie_name={error} />}
                </>
            )}
        </>
    );
};

export default Home;
