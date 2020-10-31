import React, { useEffect } from 'react';
import moment from 'moment';
import { useDataLayerValue } from '../../DataLayer';
import { baseImageUrl, calculateAge, getCombinedCredits } from '../../requests';
import useWindowSize from '../../utils/useWindowSize';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Person = () => {
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
            <div className='detailedPage_banner'>
                <div className='detailedPage_banner_content'>
                    {_window?.width > 768 && (
                        <div className='detailedPage_banner_content_poster_image'>
                            <img
                                src={`${baseImageUrl('original')}/${person?.data?.profile_path}`}
                                alt={person?.data?.name}
                                className='detailedPage_banner_content_posterimage'
                            />
                        </div>
                    )}
                    <div className='detailedPage_banner_content_details'>
                        <h1>
                            {person?.data?.name}
                            <span>
                                ({calculateAge(moment(`${person?.data?.birthday}`).format('YYYY'))}{' '}
                                years old )
                            </span>
                        </h1>
                        <p className='overview_text'>{person?.data?.biography}</p>
                    </div>
                </div>
                <div className='fadeElement'></div>
            </div>
            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <h1>Known for</h1>
                    <div className='detailedPage_mediaInfo_left_casts'>
                        {person_known_for?.data?.cast?.sort()?.map((cast) => {
                            return (
                                <Link
                                    to={`/${cast.media_type}/${cast?.id}`}
                                    className='cast'
                                    key={cast?.id}
                                >
                                    <img
                                        src={`${baseImageUrl('w300')}${
                                            cast?.poster_path || cast?.backdrop_path
                                        }`}
                                        alt={cast?.name}
                                    />
                                    <div className='castInfo'>
                                        <h1>
                                            {cast?.name ||
                                                cast?.original_name ||
                                                cast?.title ||
                                                cast?.original_title}
                                        </h1>

                                        <div>
                                            {moment(
                                                cast?.first_air_date || cast?.release_date
                                            ).format('YYYY')}
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
                            <p>{person?.data?.known_for}</p>
                        </div>
                        {person?.data?.place_of_birth !== '' ||
                            (person?.data?.place_of_birth !== undefined && (
                                <div className='mediaStats_stat'>
                                    <h1>Place of birth</h1>
                                    <p>{person?.data?.place_of_birth}</p>
                                </div>
                            ))}
                        {person?.data?.also_known_as?.length >= 1 && (
                            <div className='mediaStats_stat'>
                                <h1>Also known as</h1>
                                <p>
                                    {person?.data?.also_known_as
                                        ?.map((lang) => lang.name)
                                        .join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Person;
