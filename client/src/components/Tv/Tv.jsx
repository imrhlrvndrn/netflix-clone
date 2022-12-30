import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { getCast } from '../../requests';
import { baseImageUrl, baseImageUrlLink, calculateRuntime, formatDate } from '../../utils';
import { useWindowSize } from '../../hooks';
import { useDataLayerValue } from '../../context/data.context';
import { MediaBanner } from '../MediaBanner/MediaBanner';

export const Tv = ({ tv, handleTrailer }) => {
    console.log('TV: ', tv);
    const [{ media_cast }, dispatch] = useDataLayerValue();
    const window = useWindowSize();
    let queryValue =
        tv?.data?.name || tv?.data?.original_name || tv?.data?.title || tv?.data?.original_title;
    let query = queryValue?.toLowerCase().split(' ').join('+');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getCast('tv', tv?.data?.id));

            dispatch({ type: 'SET_CAST', result: response });
        };

        fetchData();
    }, [tv]);

    return (
        <>
            <MediaBanner media={tv} />
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
                                            {cast?.character === null || cast?.character === ''
                                                ? null
                                                : cast?.character}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <h1>Seasons</h1>
                    <div className='detailedPage_mediaInfo_left_seasons'>
                        {tv?.data?.seasons?.map((season) => {
                            return (
                                <Link
                                    to={`/tv/${tv?.data?.id}/season/${season?.season_number}`}
                                    className='season'
                                    key={season?.id}
                                >
                                    {baseImageUrl(
                                        'w200',
                                        season?.poster_path,
                                        season?.name || `Season ${season?.season_number}`
                                    )}
                                    <div className='seasonInfo'>
                                        <h1>Season {season?.season_number}</h1>
                                        <div>
                                            {season?.air_date === null
                                                ? null
                                                : formatDate('YYYY', season?.air_date)}
                                            {` | ${season?.episode_count} ${
                                                season?.episode_count > 1 ? 'Episodes' : 'Episode'
                                            }`}
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
                            <h1>First air date</h1>
                            <p>{formatDate('Do MMM YYYY', tv?.data?.first_air_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Last air date</h1>
                            <p>{formatDate('Do MMM YYYY', tv?.data?.last_air_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Status</h1>
                            <p>{tv?.data?.status}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Type</h1>
                            <p>{tv?.data?.type}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Original language</h1>
                            <p>{tv?.data?.original_language}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Networks</h1>
                            <p>
                                {tv?.data?.networks?.map((network) => {
                                    {
                                        baseImageUrl('w200', network.logo_path, network?.name);
                                    }
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
