import React from 'react';
import Row from './components/Row/Row';
import requests from './requests';

// scss files
import './GlobalStyles.scss';

// React components
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';

const App = () => {
    return (
        <div>
            <Nav />
            <Banner />
            <Row
                largeRow={true}
                title='Netflix Originals'
                fetchUrl={requests.fetchNetflixOriginals}
            />
            <Row title='Trending now' fetchUrl={requests.fetchTrending} />
            <Row title='Top rated' fetchUrl={requests.fetchTopRated} />
            <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
            <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
            <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
            <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
            <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
        </div>
    );
};

export default App;
