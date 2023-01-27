import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from './context/data.context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// styles
import './GlobalStyles.scss';

// pages
import { Home, MediaPage, Search, Watchlist } from './pages';

// components
import { Nav } from './components';

const App = () => {
    const [searchState, setSearchState] = useState(false);
    const [_, dispatch] = useDataLayerValue();

    useEffect(() => {
        dispatch({ type: 'SET_WATCHLIST' });
    }, []);

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
                        <MediaPage
                            {...props}
                            setSearchState={setSearchState}
                            searchState={searchState}
                        />
                    )}
                />
                <Route
                    exact
                    path='/watchlist'
                    render={(props) => (
                        <Watchlist
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
