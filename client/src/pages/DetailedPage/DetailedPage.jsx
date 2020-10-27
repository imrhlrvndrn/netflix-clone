import React, { useEffect } from 'react';
import axios from '../../axios';
import { useDataLayerValue } from '../../DataLayer';
import { getMedia } from '../../requests';

// scss files
import './DetailedPage.scss';

// React components
import Movie from '../../components/Movie/Movie';
import Person from '../../components/Person/Person';
import Tv from '../../components/Tv/Tv';

const DetailedPage = ({ match }) => {
    const [{ movie, tv, person }, dispatch] = useDataLayerValue();
    const mediaType = match.params.mediaType || 'movie';
    const mediaId = match.params.mediaId;
    let constructedUrl = getMedia(mediaType, mediaId);

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

        fetchData();
    }, [mediaType, mediaId, constructedUrl]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);

    // console.log('mediaType:', mediaType);

    return (
        <div className='detailedPage'>
            {mediaType === 'movie' ? (
                <Movie movie={movie} />
            ) : mediaType === 'tv' ? (
                <Tv tv={tv} />
            ) : mediaType === 'person' ? (
                <Person person={person} />
            ) : null}
        </div>
    );
};

export default DetailedPage;
