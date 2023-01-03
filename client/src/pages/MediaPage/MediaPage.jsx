import axios from '../../axios';
import React, { useEffect } from 'react';
import { generateMediaUrl } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';

// scss files
import './MediaPage.scss';

// pages
import { Search } from '..';

// components
import { Movie, Tv, Person } from '../../components';
import { getCast } from '../../requests';

export const MediaPage = ({ match, searchState, setSearchState }) => {
    const [{ movie, tv, person }, dispatch] = useDataLayerValue();
    const mediaType = match.params.mediaType || 'movie';
    const mediaId = match.params.mediaId;
    let constructedUrl = generateMediaUrl(mediaType, mediaId);

    const dispatch_media_actions = (...responses) => {
        const [cast_response, media_response] = responses;
        dispatch({
            type:
                mediaType === 'movie' ? 'SET_MOVIE' : mediaType === 'tv' ? 'SET_TV' : 'SET_PERSON',
            result: media_response,
        });
        dispatch({ type: 'SET_CAST', result: cast_response });
    };

    useEffect(() => {
        // 1. Make the request to populate the media
        // 2. Make the request to get the cast/known for) of the media
        // 3. Make another request for episodes, if the media is a TV show
        const endpoints = [getCast(mediaType, mediaId), constructedUrl];
        (async () => {
            const [cast_response, media_response] = await Promise.all(
                endpoints?.map(async (endpoint) => await axios.get(endpoint))
            );
            dispatch_media_actions(cast_response, media_response);
        })();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        return () => dispatch_media_actions(null, null);
    }, [mediaType, mediaId, constructedUrl]);

    return (
        <div className='detailedPage'>
            {searchState ? (
                <Search setSearchState={setSearchState} />
            ) : mediaType === 'movie' ? (
                <>{movie && <Movie movie={movie} />}</>
            ) : mediaType === 'tv' ? (
                <>{tv && <Tv tv={tv} />}</>
            ) : mediaType === 'person' ? (
                <>{person && <Person person={person} />}</>
            ) : null}
        </div>
    );
};
