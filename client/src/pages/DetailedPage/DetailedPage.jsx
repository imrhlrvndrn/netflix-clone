import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useDataLayerValue } from '../../context/data.context';
import { generateMediaUrl } from '../../utils';

// scss files
import './DetailedPage.scss';

// React components
import { Search } from '../';
import { Movie, Tv, Person } from '../../components';

export const DetailedPage = ({ match, searchState, setSearchState }) => {
    const [{ movie, tv, person }, dispatch] = useDataLayerValue();
    const mediaType = match.params.mediaType || 'movie';
    const mediaId = match.params.mediaId;
    let constructedUrl = generateMediaUrl(mediaType, mediaId);

    console.log(`detailedpage match object: `, match);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(constructedUrl);
            dispatch({
                type:
                    mediaType === 'movie'
                        ? 'SET_MOVIE'
                        : mediaType === 'tv'
                        ? 'SET_TV'
                        : 'SET_PERSON',
                result: response,
            });
        };

        (async () => await fetchData())();
        return () =>
            dispatch({
                type:
                    mediaType === 'movie'
                        ? 'SET_MOVIE'
                        : mediaType === 'tv'
                        ? 'SET_TV'
                        : 'SET_PERSON',
                result: null,
            });
    }, [mediaType, mediaId, constructedUrl]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [mediaType, mediaId, constructedUrl]);

    // console.log('mediaType:', mediaType);

    return (
        <div className='detailedPage'>
            {searchState ? (
                <Search setSearchState={setSearchState} />
            ) : mediaType === 'movie' ? (
                <Movie movie={movie} />
            ) : mediaType === 'tv' ? (
                <Tv tv={tv} />
            ) : mediaType === 'person' ? (
                <Person person={person} />
            ) : null}
        </div>
    );
};
