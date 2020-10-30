import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from '../../axios';
import { baseImageUrl, calculateRuntime, getCast } from '../../requests';
import useWindowSize from '../../utils/useWindowSize';
import { useDataLayerValue } from '../../DataLayer';

const Tv = ({ tv }) => {
    console.log('TV: ', tv);
    const [{ media_cast }, dispatch] = useDataLayerValue();
    const window = useWindowSize();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getCast('tv', tv?.data?.id));

            dispatch({ type: 'SET_CAST', result: response });
        };

        fetchData();
    }, [tv]);

    return (
        <>
            <div
                className='detailedPage_banner'
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #000), url(${baseImageUrl}${
                        window?.width <= 768
                            ? tv?.data?.poster_path
                            : tv?.data?.backdrop_path || tv?.data?.poster_path
                    })`,
                }}
            >
                <div className='detailedPage_banner_content'>
                    {window?.width > 768 && (
                        <div className='detailedPage_banner_content_poster_image'>
                            <img
                                src={`${baseImageUrl}${
                                    tv?.data?.poster_path || tv?.data?.backdrop_path
                                }`}
                                alt={tv?.data?.name || tv?.data?.title || tv?.data?.original_title}
                                className='detailedPage_banner_content_posterimage'
                            />
                            <div className='movie_trailer'>Watch Trailer</div>
                        </div>
                    )}
                    <div className='detailedPage_banner_content_details'>
                        <h1>
                            {tv?.data?.name || tv?.data?.original_title}
                            {tv?.data?.episode_run_time &&
                                window?.width > 768 &&
                                calculateRuntime(tv?.data?.episode_run_time)}
                            {tv?.data?.adult && <span className='adult'>A</span>}
                        </h1>
                        <div className='genre_container'>
                            {tv?.data?.genres?.map((genre) => (
                                <p className='genre'>{genre.name}</p>
                            ))}
                        </div>
                        <p className='overview_text'>{tv?.data?.overview}</p>
                        {window?.width > 768 && (
                            <div className='creators'>
                                <h2>Production Companies</h2>
                                <div className='creators_container'>
                                    {tv?.data?.production_companies?.map((company) => (
                                        <div className='creator' key={company?.id}>
                                            <img
                                                src={`${baseImageUrl}${company?.logo_path}`}
                                                alt={
                                                    company?.name || 'company name is not specified'
                                                }
                                            />
                                            <p>{company?.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='fadeElement'></div>
            </div>
            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <h1>Cast</h1>
                    <div className='detailedPage_mediaInfo_left_casts'>
                        {media_cast?.data?.cast?.map((cast) => {
                            return (
                                <Link to={`/person/${cast?.id}`} className='cast' key={cast?.id}>
                                    <img
                                        src={`${baseImageUrl}${cast?.profile_path}`}
                                        alt={cast?.name || `cast ${cast?.character}`}
                                    />
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
                    <h1>Seasons</h1>
                    <div className='detailedPage_mediaInfo_left_seasons'>
                        {tv?.data?.seasons?.map((season) => {
                            return (
                                <Link
                                    to={`/tv/${tv?.data?.id}/season/${season?.season_number}`}
                                    className='season'
                                    key={season?.id}
                                >
                                    <img
                                        src={`${baseImageUrl}${season?.poster_path}`}
                                        alt={season?.name || `Season ${season?.season_number}`}
                                    />
                                    <div className='seasonInfo'>
                                        <h1>Season {season?.season_number}</h1>
                                        <div>
                                            {season?.air_date === null
                                                ? null
                                                : moment(`${season?.air_date}`).format('YYYY')}{' '}
                                            |{' '}
                                            {`${season?.episode_count} ${
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
                            <p>{moment(tv?.data?.first_air_date).format('Do MMM YYYY')}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Last air date</h1>
                            <p>{moment(tv?.data?.last_air_date).format('Do MMM YYYY')}</p>
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
                                {tv?.data?.networks?.map((network) => (
                                    <img src={`${baseImageUrl}${network.logo_path}`} />
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tv;
