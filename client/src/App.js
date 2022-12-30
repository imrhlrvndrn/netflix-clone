import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// scss files
import './GlobalStyles.scss';

// React components
import { Nav, SeasonDetails } from './components';
import { Home, DetailedPage, Search } from './pages';

const App = () => {
    const [searchState, setSearchState] = useState(false);

    return (
        <Router>
            <Nav setSearchState={setSearchState} />
            <Switch>
                <Route
                    exact
                    path='/'
                    render={(props) => (
                        <Home
                            {...props}
                            setSearchState={setSearchState}
                            searchState={searchState}
                        />
                    )}
                />
                <Route
                    exact
                    path='/search'
                    render={() => <Search setSearchState={setSearchState} />}
                />
                <Route
                    exact
                    path='/:mediaType/:mediaId'
                    render={(props) => (
                        <DetailedPage
                            {...props}
                            setSearchState={setSearchState}
                            searchState={searchState}
                        />
                    )}
                />
                <Route
                    exact
                    path='/:mediaType/:mediaId/season/:seasonNumber'
                    render={(props) => (
                        <SeasonDetails
                            {...props}
                            setSearchState={setSearchState}
                            searchState={searchState}
                        />
                    )}
                />
            </Switch>
        </Router>
    );
};

export default App;
