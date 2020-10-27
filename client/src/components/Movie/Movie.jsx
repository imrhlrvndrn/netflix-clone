import React from 'react';
import moment from 'moment';
import { baseImageUrl, calculateRuntime } from '../../requests';

const Movie = ({ movie }) => {
    // console.log('Movie data: ', movie);

    return (
        <>
            <div
                className='detailedPage_banner'
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #000), url(${baseImageUrl}${
                        window?.width < 768
                            ? movie?.data?.poster_path
                            : movie?.data?.backdrop_path || movie?.data?.poster_path
                    })`,
                }}
            >
                <div className='detailedPage_banner_content'>
                    {window?.width > 768 && (
                        <img
                            src={`${baseImageUrl}${
                                movie?.data?.poster_path || movie?.data?.backdrop_path
                            }`}
                            alt={
                                movie?.data?.name ||
                                movie?.data?.title ||
                                movie?.data?.original_title
                            }
                            className='detailedPage_banner_content_posterimage'
                        />
                    )}
                    <div className='detailedPage_banner_content_details'>
                        <h1>
                            {movie?.data?.title || movie?.data?.original_title} (
                            {moment(`${movie?.data?.release_date}`).format('YYYY')})
                            {movie?.data?.runtime &&
                                window?.width > 768 &&
                                calculateRuntime(movie?.data?.runtime)}
                            {movie?.data?.adult && <span className='adult'>A</span>}
                        </h1>
                        <div className='genre_container'>
                            {movie?.data?.genres?.map((genre) => (
                                <p className='genre'>{genre.name}</p>
                            ))}
                        </div>
                        <p className='overview_text'>{movie?.data?.overview}</p>
                        {window?.width > 768 && (
                            <div className='creators'>
                                <h2>Production Companies</h2>
                                <div className='creators_container'>
                                    {movie?.data?.production_companies?.map((company) => (
                                        <div className='creator'>
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
                    <div className='detailedPage_mediaInfo_left_seasons'></div>
                </div>
                <div className='detailedPage_mediaInfo_right'></div>
            </section>
        </>
    );
};

export default Movie;
