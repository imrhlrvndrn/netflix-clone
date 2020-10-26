import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NetflixLogo from '../../components/Nav/NetflixLogo';

// scss files
import './Login.scss';

// images

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const login = (e) => {
    //     e.preventDefault();

    //     auth.signInWithEmailAndPassword(email, password)
    //         .then((auth) => history.push('/'))
    //         .catch((err) => alert(err.message));
    // };

    // const register = (e) => {
    //     e.preventDefault();

    //     auth.createUserWithEmailAndPassword(email, password)
    //         .then((auth) => {
    //             console.log(auth);
    //             history.push('/');
    //         })
    //         .catch((err) => alert(err.message));
    // };

    return (
        <div className='login'>
            <Link to='/'>
                <NetflixLogo width='150px' height='150px' fill='#e50914' />
            </Link>
            <form className='loginForm'>
                <h1>Sign in</h1>
                <div className='inputContainer'>
                    <label htmlFor='signin_email'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='signin_email'
                        placeholder='Email'
                    />
                </div>
                <div className='inputContainer'>
                    <label htmlFor='sigin_password'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id='sigin_password'
                        placeholder='Password'
                    />
                </div>
                <button type='submit' /*onClick={login}*/>Sign in</button>
            </form>
        </div>
    );
};

export default Login;
