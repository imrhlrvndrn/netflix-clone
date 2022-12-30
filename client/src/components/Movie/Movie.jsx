import React, { useEffect } from 'react';
import axios from '../../axios';
import { useWindowSize } from '../../hooks';
import { getCast } from '../../requests';
import { baseImageUrl, baseImageUrlLink, calculateRuntime, formatDate } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';
import { Link } from 'react-router-dom';
import { MediaBanner } from '../MediaBanner/MediaBanner';

export const Movie = ({ movie }) => {
    const _window = useWindowSize();
    const [{ media_cast }, dispatch] = useDataLayerValue();
    console.log('Movie data: ', movie);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getCast('movie', movie?.data?.id));

            dispatch({ type: 'SET_CAST', result: response });
        };

        fetchData();
    }, [movie]);

    return (
        <>
            <MediaBanner media={movie} />
            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <h1>Cast</h1>
                    <div className='detailedPage_mediaInfo_left_casts'>
                        {media_cast?.data?.cast?.map((cast) => {
                            return (
                                <Link to={`/person/${cast?.id}`} className='cast' key={cast?.id}>
                                    {baseImageUrl(
                                        'w200',
                                        cast?.profile_path,
                                        cast?.name || cast?.character
                                    )}
                                    <div className='castInfo'>
                                        <h1>{cast?.name}</h1>
                                        <div>
                                            {cast?.character === null ? null : cast?.character}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className='detailedPage_mediaInfo_right'>
                    <div className='mediaStats'>
                        <div className='mediaStats_stat'>
                            <h1>Release date</h1>
                            <p>{formatDate('Do MMM YYYY', movie?.data?.release_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Status</h1>
                            <p>{movie?.data?.status}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Spoken languages</h1>
                            <p>
                                {movie?.data?.spoken_languages?.map((lang) => lang.name).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
