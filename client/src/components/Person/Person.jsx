import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../context/data.context';
import { getCombinedCredits } from '../../requests';
import { baseImageUrl, baseImageUrlLink, calculateAge, formatDate } from '../../utils';
import { useWindowSize } from '../../hooks';
import axios from '../../axios';
import { Link } from 'react-router-dom';

// styles
import '../../shared/MediaContent.scss';

export const Person = () => {
    const [readmore, setReadmore] = useState(false);
    const _window = useWindowSize();
    const [{ person, person_known_for }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getCombinedCredits(person?.data?.id));
            dispatch({ type: 'SET_PERSON_KNOWN_FOR', result: response });
        };

        (async () => await fetchData())();

        return () => dispatch({ type: 'SET_PERSON_KNOWN_FOR', result: null });
    }, [person]);

    return (
        <>
            {' '}
            <div
                className='detailedPage_banner'
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #0e0e0e), url(${baseImageUrlLink(
                        'original'
                    )}/${_window?.width <= 768 ? person?.data?.profile_path : '#0e0e0e'})`,
                }}
            >
                <div className='detailedPage_banner_content'>
                    {_window?.width > 768 && (
                        <div className='detailedPage_banner_content_poster_image'>
                            {baseImageUrl(
                                'original',
                                person?.data?.profile_path,
                                person?.data?.name,
                                'detailedPage_banner_content_posterimage'
                            )}
                        </div>
                    )}
                    <div className='detailedPage_banner_content_details'>
                        <h1>
                            {person?.data?.name}
                            {person?.data?.birthday && (
                                <span>
                                    ({calculateAge(formatDate('YYYY', person?.data?.birthday))}{' '}
                                    years old )
                                </span>
                            )}
                        </h1>
                        <p className='overview_text'>
                            {readmore
                                ? person?.data?.biography
                                : `${person?.data?.biography.substring(0, 200)} `}
                            {person?.data?.biography.length > 200 && (
                                <button onClick={() => setReadmore(!readmore)}>
                                    {readmore ? 'Read less' : 'Read more'}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
                <div className='fadeElement'></div>
            </div>
            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <h1>Known for</h1>
                    <div style={{ margin: '2rem 0' }}>
                        {person_known_for?.data?.cast
                            ?.filter(
                                (media) =>
                                    formatDate(
                                        'YYYY',
                                        media?.first_air_date || media?.release_date
                                    ) !== 'No date'
                            )
                            ?.sort(
                                (a, b) =>
                                    +formatDate('YYYY', b?.first_air_date || b?.release_date) -
                                    +formatDate('YYYY', a?.first_air_date || a?.release_date)
                            )
                            ?.map((media) => {
                                return (
                                    <Link
                                        to={`/${media?.media_type}/${media?.id}`}
                                        className='media_content'
                                        key={media?.id}
                                    >
                                        {baseImageUrl(
                                            'w300',
                                            media?.poster_path || media?.backdrop_path,
                                            media?.name
                                        )}
                                        <div className='content'>
                                            <h1 className='title'>
                                                {media?.name ||
                                                    media?.original_name ||
                                                    media?.title ||
                                                    media?.original_title}
                                            </h1>
                                            <div className='release_date'>
                                                {formatDate(
                                                    'YYYY',
                                                    media?.first_air_date || media?.release_date
                                                )}
                                                {media?.episode_count &&
                                                    ` | ${media?.episode_count} episodes`}
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
                            <h1>Known for</h1>
                            <p>{person?.data?.known_for_department}</p>
                        </div>
                        {person?.data?.birthday !== '' ||
                            (person?.data?.birthday !== null && (
                                <div className='mediaStats_stat'>
                                    <h1>Birthday</h1>
                                    <p>{formatDate('Do MMM YYYY', person?.data?.birthday)}</p>
                                </div>
                            ))}
                        {person?.data?.place_of_birth !== '' ||
                            (person?.data?.place_of_birth !== undefined && (
                                <div className='mediaStats_stat'>
                                    <h1>Place of birth</h1>
                                    <p>{person?.data?.place_of_birth}</p>
                                </div>
                            ))}

                        {person?.data?.gender !== undefined ||
                            (person?.data?.gender !== 0 && (
                                <div className='mediaStats_stat'>
                                    <h1>Gender</h1>
                                    <p>
                                        {person?.data?.gender === 1
                                            ? 'Female'
                                            : person?.data?.gender === 2
                                            ? 'Male'
                                            : null}
                                    </p>
                                </div>
                            ))}
                        {person?.data?.also_known_as?.length > 0 && (
                            <div className='mediaStats_stat'>
                                <h1>Also known as</h1>
                                <p>{person?.data?.also_known_as?.map((lang) => lang).join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
