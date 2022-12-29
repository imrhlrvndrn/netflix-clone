import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../context/data.context';
import {
    baseImageUrl,
    baseImageUrlLink,
    calculateAge,
    formatDate,
    getCombinedCredits,
} from '../../requests';
import useWindowSize from '../../utils/useWindowSize';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Person = () => {
    const [readmore, setReadmore] = useState(false);
    const _window = useWindowSize();
    const [{ person, person_known_for }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getCombinedCredits(person?.data?.id));
            dispatch({ type: 'SET_PERSON_KNOWN_FOR', result: response });
        };

        fetchData();
    }, [person]);

    console.log('Person', person);
    console.log('Person known for ', person_known_for);

    return (
        <>
            {' '}
            <div
                className='detailedPage_banner'
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #000), url(${baseImageUrlLink(
                        'original'
                    )}/${_window?.width <= 768 ? person?.data?.profile_path : 'black'})`,
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
                    <div className='detailedPage_mediaInfo_left_casts'>
                        {person_known_for?.data?.cast?.map((cast) => {
                            return (
                                <Link
                                    to={`/${cast?.media_type}/${cast?.id}`}
                                    className='cast'
                                    key={cast?.id}
                                >
                                    {baseImageUrl(
                                        'w300',
                                        cast?.poster_path || cast?.backdrop_path,
                                        cast?.name
                                    )}
                                    <div className='castInfo'>
                                        <h1>
                                            {cast?.name ||
                                                cast?.original_name ||
                                                cast?.title ||
                                                cast?.original_title}
                                        </h1>

                                        <div>
                                            {formatDate(
                                                'YYYY',
                                                cast?.first_air_date || cast?.release_date
                                            )}
                                            {cast?.episode_count &&
                                                ` | ${cast?.episode_count} episodes`}
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

export default Person;
