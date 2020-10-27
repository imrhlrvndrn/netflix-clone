import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// scss files
import './GlobalStyles.scss';

// React components
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import DetailedPage from './pages/DetailedPage/DetailedPage';
import SeasonDetails from './components/SeasonDetails/SeasonDetails';

const App = () => {
    // useEffect(() => {
    //     auth.onAuthStateChanged((authUser) => {
    //         console.log('User is: ', authUser);
    //         if (authUser) {
    //             dispatch({ type: 'SET_USER', user: authUser });
    //         } else {
    //             dispatch({ type: 'SET_USER', user: null });
    //             history.push('/login');
    //         }
    //     });
    // }, []);

    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path='/' render={() => <Home />} />
                <Route exact path='/login' render={() => <Login />} />
                <Route exact path='/:mediaType/:mediaId' component={DetailedPage} />
                <Route
                    exact
                    path='/:mediaType/:mediaId/season/:seasonNumber'
                    component={SeasonDetails}
                />
            </Switch>
        </Router>
    );
};

export default App;
