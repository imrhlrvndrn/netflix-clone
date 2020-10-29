import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { baseImageUrl, calculateRuntime } from '../../requests';
import useWindowSize from '../../utils/useWindowSize';

const Tv = ({ tv }) => {
    console.log('TV: ', tv);
    const window = useWindowSize();

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
                <div className='detailedPage_mediaInfo_right'></div>
            </section>
        </>
    );
};

export default Tv;
