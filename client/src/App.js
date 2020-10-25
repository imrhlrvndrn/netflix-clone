import React, { useState } from 'react';
import Row from './components/Row/Row';
import requests from './requests';

// scss files
import './GlobalStyles.scss';

// React components
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

const App = () => {
    const [error, setError] = useState('');

    return (
        <div>
            <Nav />
            <Banner />
            <Row setError={setError} fetchUrl={requests.fetchNetflixOriginals} />
            <Row setError={setError} title='Trending now' fetchUrl={requests.fetchTrending} />
            <Row setError={setError} title='Top rated' fetchUrl={requests.fetchTopRated} />
            <Row setError={setError} title='Action Movies' fetchUrl={requests.fetchActionMovies} />
            <Row setError={setError} title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
            <Row setError={setError} title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
            <Row
                setError={setError}
                title='Romance Movies'
                fetchUrl={requests.fetchRomanceMovies}
            />
            <Row setError={setError} title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
            {error && <ErrorHandler setError={setError} movie_name={error} />}
        </div>
    );
};

export default App;
