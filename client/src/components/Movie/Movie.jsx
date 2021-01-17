import React, { useEffect } from 'react';
import axios from '../../axios';
import useWindowSize from '../../utils/useWindowSize';
import {
    baseImageUrl,
    baseImageUrlLink,
    calculateRuntime,
    formatDate,
    getCast,
} from '../../requests';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
    const _window = useWindowSize();
    const [{ media_cast }, dispatch] = useDataLayerValue();
    let queryValue =
        movie?.data?.name ||
        movie?.data?.original_name ||
        movie?.data?.title ||
        movie?.data?.original_title;
    let query = queryValue?.toLowerCase().split(' ').join('+');
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
            <div
                className='detailedPage_banner'
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #000), url(${baseImageUrlLink(
                        'original'
                    )}/${
                        _window?.width <= 768
                            ? movie?.data?.poster_path
                            : movie?.data?.backdrop_path || movie?.data?.poster_path
                    })`,
                }}
            >
                <div className='detailedPage_banner_content'>
                    <div className='detailedPage_banner_content_poster_image'>
                        {baseImageUrl(
                            'original',
                            movie?.data?.poster_path || movie?.data?.backdrop_path,
                            movie?.data?.name ||
                                movie?.data?.original_name ||
                                movie?.data?.title ||
                                movie?.data?.original_title,
                            'detailedPage_banner_content_posterimage'
                        )}
                        <a
                            className='movie_trailer'
                            target='_blank'
                            rel='noreferrer'
                            href={`https://youtube.com/results?search_query=${query}+official+trailer`}
                        >
                            watch trailer
                        </a>
                    </div>
                    <div className='detailedPage_banner_content_details'>
                        <h1>
                            {movie?.data?.title || movie?.data?.original_title}
                            {movie?.data?.release_date !== '' &&
                                ` (${formatDate('YYYY', movie?.data?.release_date)})`}
                            {_window?.width > 768 && calculateRuntime(movie?.data?.runtime)}
                            {movie?.data?.adult && <span className='adult'>A</span>}
                        </h1>
                        <div className='genre_container'>
                            {movie?.data?.genres?.map((genre) => (
                                <p className='genre'>{genre.name}</p>
                            ))}
                        </div>
                        <p className='overview_text'>{movie?.data?.overview}</p>
                        {_window?.width > 1024 && movie?.data?.production_companies.length > 1 && (
                            <div className='creators'>
                                <h2>Production Companies</h2>
                                <div className='creators_container'>
                                    {movie?.data?.production_companies?.map((company) => (
                                        <div className='creator'>
                                            {company?.logo_path && (
                                                <img
                                                    src={`${baseImageUrl}${company?.logo_path}`}
                                                    alt={
                                                        company?.name ||
                                                        'company name is not specified'
                                                    }
                                                />
                                            )}
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

export default Movie;
